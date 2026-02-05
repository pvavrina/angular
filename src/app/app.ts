import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AlbumService } from './services/album.service';
import { Musicbrainz } from './services/musicbrainz';
import { Album } from './models/album.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="main-container">
      <h1>{{ title() }}</h1>

      <div class="album-list">
        @for (album of albums(); track album.documentId) {
          <div class="album-card">
            <h2>{{ album.title }}</h2>
            <p class="meta">
              Released in <strong>{{ album.release_date | date:'yyyy' }}</strong>
            </p>
            <code>MBID: {{ album.mbid }}</code>

            <div class="actions">
              <button (click)="album.mbid && loadDetails(album.mbid)" class="info-btn">
                Fetch Tracklist (MusicBrainz)
              </button>
            </div>

            @if (selectedDetails() && selectedDetails()?.id === album.mbid) {
              <div class="details-panel">
                <h3>Tracklist:</h3>
                <ul>
                  @for (medium of selectedDetails().media; track $index) {
                    @for (track of medium.tracks; track track.id) {
                      <li>{{ track.number }}. {{ track.title }}</li>
                    }
                  }
                </ul>
              </div>
            }
          </div>
        } @empty {
          <p>The record store is empty.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .main-container { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 2rem; color: #333; }
    .album-list { display: grid; gap: 1.5rem; margin-top: 1rem; }
    .album-card { 
      border-left: 5px solid #007bff; 
      background: #f8f9fa; 
      padding: 1.5rem; 
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    }
    .actions { margin-top: 1rem; }
    .info-btn { 
      background: #007bff; color: white; border: none; 
      padding: 8px 15px; border-radius: 4px; cursor: pointer;
      transition: background 0.2s;
    }
    .info-btn:hover { background: #0056b3; }
    .details-panel { 
      margin-top: 1rem; padding: 1rem; background: #fff; 
      border: 1px solid #ddd; border-radius: 4px; 
    }
    ul { list-style: none; padding: 0; }
    li { padding: 5px 0; border-bottom: 1px solid #eee; font-size: 0.9rem; }
    h2 { margin: 0; }
    .meta { color: #666; margin: 0.5rem 0; }
    code { background: #eee; padding: 0.2rem 0.4rem; font-size: 0.8rem; border-radius: 3px; }
  `]
})
export class App implements OnInit {
  protected readonly title = signal('Music Manager & Encyclopedia');
  
  // Injecting services
  private albumService = inject(AlbumService);
  private mbService = inject(Musicbrainz);
  
  // State management with Signals
  protected albums = signal<Album[]>([]);
  protected selectedDetails = signal<any>(null);

  ngOnInit() {
    // Initial fetch from Strapi
    this.albumService.getAlbums().subscribe(response => {
      this.albums.set(response.data);
    });
  }

  // Fetch extra data from MusicBrainz API
  loadDetails(mbid: string) {
    this.mbService.getReleaseDetails(mbid).subscribe({
      next: (data) => this.selectedDetails.set(data),
      error: (err) => console.error('MusicBrainz API error:', err)
    });
  }
}
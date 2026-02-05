import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Musicbrainz {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://musicbrainz.org/ws/2';

  // Fetch release details including tracklist from global API
  getReleaseDetails(mbid: string): Observable<any> {
    const url = `${this.API_URL}/release/${mbid}?fmt=json&inc=recordings`;
    return this.http.get<any>(url);
  }
}
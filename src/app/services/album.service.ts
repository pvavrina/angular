import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StrapiResponse } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  // Pointing to local Strapi 5 instance on Ragnar
  private apiUrl = 'http://localhost:1337/api/albums';

  constructor(private http: HttpClient) {}

  // Fetch all albums with Strapi 5 specific response structure
  getAlbums(): Observable<StrapiResponse> {
    return this.http.get<StrapiResponse>(this.apiUrl);
  }
}
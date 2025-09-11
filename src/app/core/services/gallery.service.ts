import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from '../../models/album.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private albumsSubject = new BehaviorSubject<Album[]>([]);
  albums$ = this.albumsSubject.asObservable();

  setAlbums(albums: Album[]) {
    this.albumsSubject.next(albums);
  }

  addAlbum(album: Album) {
    const current = this.albumsSubject.value;
    this.albumsSubject.next([...current, album]);
  }

  removeAlbum(id: string) {
    this.albumsSubject.next(this.albumsSubject.value.filter(a => a.id !== id));
  }
}

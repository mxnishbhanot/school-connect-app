import { IonModal, IonIcon, IonInput } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  images, camera, calendarOutline, cloudUpload, closeCircle,
  eyeOutline,
  cameraOutline
} from 'ionicons/icons';
interface Album {
  id?: number; // Optional ID for identifying albums
  event: string;
  date: string;
  images: File[]; // Array of uploaded image files
}
@Component({
  selector: 'app-gallery-tab',
  standalone: true,
  imports: [
    IonModal,
    IonIcon,
    CommonModule,
    IonInput,
    ReactiveFormsModule
  ],
  templateUrl: './gallery-tab.component.html',
  styleUrls: ['./gallery-tab.component.scss'],
})
export class GalleryTabComponent {
  albums: Album[] = [];
  galleryForm!: FormGroup;
  showGalleryModal = false;
  editingAlbum: Album | null = null;

  constructor(private fb: FormBuilder) {
    addIcons({
      eyeOutline,
      cloudUpload,
      cameraOutline,
      closeCircle,
      camera
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.loadSampleAlbums(); // For demonstration purposes
  }

  initForm(): void {
    this.galleryForm = this.fb.group({
      event: ['', [Validators.required]],
      date: ['', [Validators.required]],
      file: [null, [Validators.required]], // File input for photos
    });
  }

  loadSampleAlbums(): void {
    // Sample data for demonstration
    this.albums = [
      {
        id: 1,
        event: 'Sports Day 2023',
        date: '2023-10-15',
        images: [], // Empty array for demo purposes
      },
      {
        id: 2,
        event: 'Cultural Festival',
        date: '2023-09-20',
        images: [], // Empty array for demo purposes
      },
    ];
  }

  openGalleryModal(album?: Album): void {
    if (album) {
      this.editingAlbum = album;
      this.galleryForm.patchValue({
        event: album.event,
        date: album.date,
        file: null, // Reset file input
      });
    } else {
      this.editingAlbum = null;
      this.galleryForm.reset();
    }
    this.showGalleryModal = true;
  }

  closeGalleryModal(): void {
    this.showGalleryModal = false;
    this.editingAlbum = null;
    this.galleryForm.reset();
  }

  saveAlbum(): void {
    if (this.galleryForm.invalid) {
      return;
    }

    const { event, date, file } = this.galleryForm.value;

    // Convert file input to an array of files
    const images = Array.from(file || []) as File[];

    if (this.editingAlbum) {
      // Update existing album
      this.editingAlbum.event = event;
      this.editingAlbum.date = date;
      this.editingAlbum.images = images;
    } else {
      // Add new album
      const newAlbum: Album = {
        id: Date.now(), // Use timestamp as unique ID
        event,
        date,
        images,
      };
      this.albums.push(newAlbum);
    }

    this.closeGalleryModal();
  }

  editAlbum(album: Album): void {
    this.openGalleryModal(album);
  }

  deleteAlbum(album: Album): void {
    this.albums = this.albums.filter((item) => item.id !== album.id);
  }

  viewAlbum(album: Album): void {
    console.log('Viewing album:', album);
    // Implement logic to display album photos (e.g., navigate to a details page)
  }

  trackByFn(index: number, item: Album): number {
    return item.id || index;
  }

  isFormFieldInvalid(field: string): boolean {
    const control = this.galleryForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getFormFieldError(field: string): string {
    const control = this.galleryForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    return '';
  }
}

// src/app/components/teacher-dashboard/gallery-tab/gallery-tab.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonModal, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  images, camera, calendarOutline, cloudUpload, closeCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-gallery-tab',
  templateUrl: './gallery-tab.component.html',
  styleUrls: ['./gallery-tab.component.scss'],
  standalone: true,
  imports: [
   IonContent, IonIcon, IonModal, IonInput,
    CommonModule, ReactiveFormsModule
  ],
})
export class GalleryTabComponent {
  showGalleryModal = false;
  galleryForm: FormGroup;

  // Sample data - should ideally come from a service
  albums = [
    { event: 'Sports Day', date: '2025-09-01', images: [1, 2, 3] },
    { event: 'Annual Function', date: '2025-08-15', images: [1, 2, 4, 5] },
    { event: 'Science Fair', date: '2025-08-30', images: [1, 2] }
  ];

  constructor(private fb: FormBuilder) {
    addIcons({ images, camera, calendarOutline, cloudUpload, closeCircle });
    this.galleryForm = this.fb.group({
      event: ['', [Validators.required]],
      date: ['', [Validators.required]],
      file: ['']
    });
  }

  openGalleryModal() {
    this.showGalleryModal = true;
  }

  closeGalleryModal() {
    this.showGalleryModal = false;
    this.galleryForm.reset();
  }

  addAlbum() {
    if (this.galleryForm.valid) {
      const formValue = this.galleryForm.value;
      const newAlbum = {
        event: formValue.event,
        date: formValue.date,
        images: [1, 2, 3] // Placeholder - handle file upload logic here
      };
      this.albums.unshift(newAlbum); // Add to beginning
      this.galleryForm.reset();
      this.closeGalleryModal();
      console.log('Album created successfully!');
    } else {
      Object.keys(this.galleryForm.controls).forEach(key => {
        const control = this.galleryForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Utility Methods
  isFormFieldInvalid(fieldName: string): boolean {
    const field = this.galleryForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  getFormFieldError(fieldName: string): string {
    const field = this.galleryForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    return '';
  }
}

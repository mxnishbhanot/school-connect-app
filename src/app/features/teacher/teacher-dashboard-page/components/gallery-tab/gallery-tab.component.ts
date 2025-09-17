import { IonModal, IonIcon, IonContent, IonInput } from '@ionic/angular/standalone';
// src/app/components/teacher-dashboard/gallery-tab/gallery-tab.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  images, camera, calendarOutline, cloudUpload, closeCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-gallery-tab',
  standalone: true,
  imports: [
    IonModal,
    IonIcon,
    IonContent,
    CommonModule,
    IonInput,
    ReactiveFormsModule
  ],
  templateUrl: './gallery-tab.component.html',
  styleUrls: ['./gallery-tab.component.scss'],
})
export class GalleryTabComponent {
  showGalleryModal = false;
  galleryForm: FormGroup;

  // Static data for the gallery
  albums = [
    {
      event: 'Sports Day',
      date: '2025-09-01',
      images: ['sports1.jpg', 'sports2.jpg', 'sports3.jpg']
    },
    {
      event: 'Annual Function',
      date: '2025-08-15',
      images: ['annual1.jpg', 'annual2.jpg', 'annual3.jpg', 'annual4.jpg']
    },
    {
      event: 'Science Fair',
      date: '2025-08-30',
      images: ['science1.jpg', 'science2.jpg']
    },
    {
      event: 'Field Trip',
      date: '2025-08-20',
      images: ['trip1.jpg', 'trip2.jpg', 'trip3.jpg']
    },
    {
      event: 'Art Exhibition',
      date: '2025-08-10',
      images: ['art1.jpg', 'art2.jpg', 'art3.jpg', 'art4.jpg']
    },
    {
      event: 'Math Olympiad',
      date: '2025-08-05',
      images: ['math1.jpg', 'math2.jpg']
    }
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
        images: ['new1.jpg', 'new2.jpg'] // Static placeholder images
      };

      this.albums.unshift(newAlbum); // Add to beginning
      this.galleryForm.reset();
      this.closeGalleryModal();
      console.log('Album created successfully!');
    } else {
      // Mark all fields as touched to show validation errors
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
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
    }
    return '';
  }
}

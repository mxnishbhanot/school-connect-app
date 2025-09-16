// src/app/components/teacher-dashboard/announcements-tab/announcements-tab.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonIcon, IonModal, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  megaphone, calendarOutline, send, closeCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-announcements-tab',
  templateUrl: './announcements-tab.component.html',
  styleUrls: ['./announcements-tab.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonIcon, IonModal, IonTextarea,
    CommonModule, ReactiveFormsModule
  ],
})
export class AnnouncementsTabComponent {
  showAnnouncementModal = false;
  announcementForm: FormGroup;
  calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Sample data - should ideally come from a service
  announcements = [
    { message: 'Parent-Teacher meeting scheduled for this Friday. Please ensure all parents attend.', date: '2025-09-12' },
    { message: 'School will be closed on Monday for Independence Day celebration.', date: '2025-09-15' },
    { message: 'Mid-term examinations will begin from October 1st. Study schedule has been shared.', date: '2025-09-10' }
  ];

  calendarEvents = [
    { date: '2025-09-12', label: 'PTM' },
    { date: '2025-09-15', label: 'Holiday' },
    { date: '2025-09-20', label: 'Exam' }
  ];

  constructor(private fb: FormBuilder) {
    addIcons({ megaphone, calendarOutline, send, closeCircle });
    this.announcementForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  openAnnouncementModal() {
    this.showAnnouncementModal = true;
  }

  closeAnnouncementModal() {
    this.showAnnouncementModal = false;
    this.announcementForm.reset();
  }

  addAnnouncement() {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value;
      const newAnnouncement = {
        message: formValue.message,
        date: new Date().toISOString().slice(0, 10)
      };
      this.announcements.unshift(newAnnouncement); // Add to beginning
      this.announcementForm.reset();
      this.closeAnnouncementModal();
      console.log('Announcement added successfully!');
    } else {
      Object.keys(this.announcementForm.controls).forEach(key => {
        const control = this.announcementForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Utility Methods
  isFormFieldInvalid(fieldName: string): boolean {
    const field = this.announcementForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  getFormFieldError(fieldName: string): string {
    const field = this.announcementForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      if (field.errors['minlength']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too short`;
    }
    return '';
  }
}

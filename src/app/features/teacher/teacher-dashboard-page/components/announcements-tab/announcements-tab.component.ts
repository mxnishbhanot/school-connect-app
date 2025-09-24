// src/app/components/teacher-dashboard/announcements-tab/announcements-tab.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonIcon, IonModal, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  megaphone, calendarOutline, send, closeCircle,
  eyeOutline
} from 'ionicons/icons';

interface Announcement {
  id?: number; // Optional ID for identifying announcements
  title?: string;
  message: string;
  date: Date;
}

@Component({
  selector: 'app-announcements-tab',
  templateUrl: './announcements-tab.component.html',
  styleUrls: ['./announcements-tab.component.scss'],
  standalone: true,
  imports: [
    IonIcon, IonModal, IonTextarea,
    CommonModule, ReactiveFormsModule
  ],
})
export class AnnouncementsTabComponent {
  announcements: Announcement[] = [];
  announcementForm!: FormGroup;
  showAnnouncementModal = false;
  editingAnnouncement: Announcement | null = null;

  constructor(private fb: FormBuilder) {

    addIcons({
      eyeOutline,
      megaphone,
      closeCircle
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.loadSampleAnnouncements(); // For demonstration purposes
  }

  initForm(): void {
    this.announcementForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  loadSampleAnnouncements(): void {
    // Sample data for demonstration
    this.announcements = [
      {
        id: 1,
        title: 'Upcoming Exam Schedule',
        message: 'Please review the exam schedule posted on the portal.',
        date: new Date(),
      },
      {
        id: 2,
        title: 'Holiday Notice',
        message: 'The school will be closed on Monday for a public holiday.',
        date: new Date(),
      },
    ];
  }

  openAnnouncementModal(announcement?: Announcement): void {
    if (announcement) {
      this.editingAnnouncement = announcement;
      this.announcementForm.patchValue({ message: announcement.message });
    } else {
      this.editingAnnouncement = null;
      this.announcementForm.reset();
    }
    this.showAnnouncementModal = true;
  }

  closeAnnouncementModal(): void {
    this.showAnnouncementModal = false;
    this.editingAnnouncement = null;
    this.announcementForm.reset();
  }

  saveAnnouncement(): void {
    if (this.announcementForm.invalid) {
      return;
    }

    const message = this.announcementForm.value.message;

    if (this.editingAnnouncement) {
      // Update existing announcement
      this.editingAnnouncement.message = message;
    } else {
      // Add new announcement
      const newAnnouncement: Announcement = {
        id: Date.now(), // Use timestamp as unique ID
        message,
        date: new Date(),
      };
      this.announcements.push(newAnnouncement);
    }

    this.closeAnnouncementModal();
  }

  editAnnouncement(announcement: Announcement): void {
    this.openAnnouncementModal(announcement);
  }

  deleteAnnouncement(announcement: Announcement): void {
    this.announcements = this.announcements.filter(
      (item) => item.id !== announcement.id
    );
  }

  showAnnouncementOptions(announcement: Announcement): void {
    console.log('More options for:', announcement);
  }

  trackByFn(index: number, item: Announcement): number {
    return item.id || index;
  }

  isFormFieldInvalid(field: string): boolean {
    const control = this.announcementForm.get(field);
    return !!control && !!control.invalid && (control.touched || control.dirty);
  }

  getFormFieldError(field: string): string {
    const control = this.announcementForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      return 'Message must be at least 10 characters long.';
    }
    return '';
  }
}

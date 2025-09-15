import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { HomeworkService } from 'src/app/core/services/homework.service';
import { Homework } from 'src/app/models/homework.model';
import {
  IonInput,
  IonGrid,
  IonModal,
  IonRow,
  IonTabs,
  IonContent,
  IonApp,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTab,
  IonCol,
  IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  libraryOutline,
  library,
  imagesOutline,
  images,
  notificationsOutline,
  notifications,
  addCircleOutline,
  addCircle,
  book,
  bookOutline,
  pencil,
  pencilOutline,
  trash,
  trashOutline,
  calendarOutline,
  calendar,
  checkmarkCircle,
  checkmarkCircleOutline,
  closeCircle,
  closeCircleOutline,
  camera,
  cameraOutline,
  cloudUpload,
  cloudUploadOutline,
  megaphone,
  megaphoneOutline,
  send,
  sendOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-teacher-dashboard-page',
  templateUrl: './teacher-dashboard-page.component.html',
  styleUrls: ['./teacher-dashboard-page.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonTab,
    IonTabBar,
    IonLabel,
    IonApp,
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonTextarea,
    IonContent,
    IonTabs,
    IonTabButton,
    IonIcon
  ],
})
export class TeacherDashboardPageComponent {
  calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  // Homework
  showHomeworkModal = false;
  homeworkForm: FormGroup;
  homework$;

  // Gallery
  showGalleryModal = false;
  galleryForm: FormGroup;
  albums = [
    {
      event: 'Sports Day',
      date: '2025-09-01',
      images: [1, 2, 3]
    },
    {
      event: 'Annual Function',
      date: '2025-08-15',
      images: [1, 2, 4, 5]
    },
    {
      event: 'Science Fair',
      date: '2025-08-30',
      images: [1, 2]
    }
  ];

  // Announcements/Calendar
  showAnnouncementModal = false;
  announcementForm: FormGroup;
  announcements = [
    {
      message: 'Parent-Teacher meeting scheduled for this Friday. Please ensure all parents attend.',
      date: '2025-09-12'
    },
    {
      message: 'School will be closed on Monday for Independence Day celebration.',
      date: '2025-09-15'
    },
    {
      message: 'Mid-term examinations will begin from October 1st. Study schedule has been shared.',
      date: '2025-09-10'
    }
  ];

  calendarEvents = [
    { date: '2025-09-12', label: 'PTM' },
    { date: '2025-09-15', label: 'Holiday' },
    { date: '2025-09-20', label: 'Exam' }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(HomeworkService) private homeworkService: HomeworkService
  ) {
    // Register all icons
    addIcons({
      'library-outline': libraryOutline,
      'library': library,
      'images-outline': imagesOutline,
      'images': images,
      'notifications-outline': notificationsOutline,
      'notifications': notifications,
      'add-circle-outline': addCircleOutline,
      'add-circle': addCircle,
      'book': book,
      'book-outline': bookOutline,
      'pencil': pencil,
      'pencil-outline': pencilOutline,
      'trash': trash,
      'trash-outline': trashOutline,
      'calendar-outline': calendarOutline,
      'calendar': calendar,
      'checkmark-circle': checkmarkCircle,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'close-circle': closeCircle,
      'close-circle-outline': closeCircleOutline,
      'camera': camera,
      'camera-outline': cameraOutline,
      'cloud-upload': cloudUpload,
      'cloud-upload-outline': cloudUploadOutline,
      'megaphone': megaphone,
      'megaphone-outline': megaphoneOutline,
      'send': send,
      'send-outline': sendOutline
    });

    // Initialize forms
    this.homeworkForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      attachment: [''],
      class: ['', [Validators.required]]
    });

    this.galleryForm = this.fb.group({
      event: ['', [Validators.required]],
      date: ['', [Validators.required]],
      file: ['']
    });

    this.announcementForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Get homework observable
    this.homework$ = this.homeworkService.homework$;
  }

  // Homework Methods
  addHomework() {
    if (this.homeworkForm.valid) {
      const formValue = this.homeworkForm.value;
      const newHomework: Homework = {
        id: Math.random().toString(36).substring(2, 15),
        title: formValue.title,
        description: formValue.description,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 1 week
        assignedBy: 'Current Teacher',
        classId: formValue.class
      };

      this.homeworkService.addHomework(newHomework);
      this.homeworkForm.reset();
      this.closeHomeworkModal();

      // Show success feedback (you can implement toast/alert)
      console.log('Homework added successfully!');
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.homeworkForm.controls).forEach(key => {
        this.homeworkForm.get(key)?.markAsTouched();
      });
    }
  }

  deleteHomework(id: string) {
    // Add confirmation dialog in real implementation
    if (confirm('Are you sure you want to delete this homework?')) {
      this.homeworkService.removeHomework(id);
      console.log('Homework deleted successfully!');
    }
  }

  editHomework(homework: Homework) {
    // Implement edit functionality
    this.homeworkForm.patchValue({
      title: homework.title,
      description: homework.description,
      class: homework.classId
    });
    this.openHomeworkModal();
  }

  // Gallery Methods
  addAlbum() {
    if (this.galleryForm.valid) {
      const formValue = this.galleryForm.value;
      const newAlbum = {
        event: formValue.event,
        date: formValue.date,
        images: [1, 2, 3] // Placeholder - in real app, handle file upload
      };

      this.albums.unshift(newAlbum); // Add to beginning of array
      this.galleryForm.reset();
      this.closeGalleryModal();

      console.log('Album created successfully!');
    } else {
      Object.keys(this.galleryForm.controls).forEach(key => {
        this.galleryForm.get(key)?.markAsTouched();
      });
    }
  }

  // Announcement Methods
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
        this.announcementForm.get(key)?.markAsTouched();
      });
    }
  }

  // Navigation
  setTab(tab: 'homework' | 'gallery' | 'announcements') {
    this.tab = tab;
  }

  // Modal Controls - Homework
  openHomeworkModal() {
    this.showHomeworkModal = true;
  }

  closeHomeworkModal() {
    this.showHomeworkModal = false;
    this.homeworkForm.reset();
  }

  // Modal Controls - Gallery
  openGalleryModal() {
    this.showGalleryModal = true;
  }

  closeGalleryModal() {
    this.showGalleryModal = false;
    this.galleryForm.reset();
  }

  // Modal Controls - Announcements
  openAnnouncementModal() {
    this.showAnnouncementModal = true;
  }

  closeAnnouncementModal() {
    this.showAnnouncementModal = false;
    this.announcementForm.reset();
  }

  // Utility Methods
  getFormFieldError(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }

  isFormFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {
    const field = formGroup.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}

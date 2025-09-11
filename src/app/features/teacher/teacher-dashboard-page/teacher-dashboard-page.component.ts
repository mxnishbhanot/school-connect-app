import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { HomeworkService } from 'src/app/core/services/homework.service';
import { Homework } from 'src/app/models/homework.model';

@Component({
  selector: 'app-teacher-dashboard-page',
  templateUrl: './teacher-dashboard-page.component.html',
  styleUrls: ['./teacher-dashboard-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TeacherDashboardPageComponent {
  calendarDays = Array.from({length: 30}, (_, i) => i + 1);
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  // Homework
  showHomeworkModal = false;
  homeworkForm: FormGroup;
  homework$;

  // Gallery
  showGalleryModal = false;
  galleryForm: FormGroup;
  albums = [
    { event: 'Sports Day', date: '2025-09-01', images: [1,2,3] },
    { event: 'Annual Function', date: '2025-08-15', images: [1,2] }
  ];

  // Announcements/Calendar
  showAnnouncementModal = false;
  announcementForm: FormGroup;
  announcements = [
    { message: 'Parent-Teacher meeting on Friday', date: '2025-09-12' },
    { message: 'School closed on Monday', date: '2025-09-15' }
  ];
  calendarEvents = [
    { date: '2025-09-12', label: 'PTM' },
    { date: '2025-09-15', label: 'Holiday' }
  ];
  constructor(private fb: FormBuilder, @Inject(HomeworkService) private homeworkService: HomeworkService) {
    this.homeworkForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      attachment: [''],
      class: ['', Validators.required]
    });
    this.galleryForm = this.fb.group({
      event: ['', Validators.required],
      date: ['', Validators.required],
      file: ['']
    });
    this.announcementForm = this.fb.group({
      message: ['', Validators.required]
    });
    this.homework$ = this.homeworkService.homework$;
  }

  addHomework() {
    if (this.homeworkForm.valid) {
      const newHomework: Homework = {
        id: Math.random().toString(36).substring(2),
        title: this.homeworkForm.value.title,
        description: this.homeworkForm.value.description,
        dueDate: new Date(),
        assignedBy: 'teacher',
        classId: this.homeworkForm.value.class
      };
      this.homeworkService.addHomework(newHomework);
      this.homeworkForm.reset();
      this.closeHomeworkModal();
    }
  }

  deleteHomework(id: string) {
    this.homeworkService.removeHomework(id);
  }

  setTab(tab: 'homework' | 'gallery' | 'announcements') {
    this.tab = tab;
  }

  // Homework
  openHomeworkModal() { this.showHomeworkModal = true; }
  closeHomeworkModal() { this.showHomeworkModal = false; }

  // Gallery
  openGalleryModal() { this.showGalleryModal = true; }
  closeGalleryModal() { this.showGalleryModal = false; }
  addAlbum() {
    if (this.galleryForm.valid) {
      this.albums.push({ ...this.galleryForm.value, images: [1] });
      this.galleryForm.reset();
      this.closeGalleryModal();
    }
  }

  // Announcements
  openAnnouncementModal() { this.showAnnouncementModal = true; }
  closeAnnouncementModal() { this.showAnnouncementModal = false; }
  addAnnouncement() {
    if (this.announcementForm.valid) {
      this.announcements.push({ message: this.announcementForm.value.message, date: new Date().toISOString().slice(0,10) });
      this.announcementForm.reset();
      this.closeAnnouncementModal();
    }
  }
}

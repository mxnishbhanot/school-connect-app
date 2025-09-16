// src/app/components/teacher-dashboard/homework-tab/homework-tab.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IonContent, IonIcon, IonModal, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  book, addCircleOutline, pencilOutline, trashOutline, calendarOutline,
  checkmarkCircle,
  closeCircle
} from 'ionicons/icons';
import { HomeworkService } from 'src/app/core/services/homework.service';
import { Homework } from 'src/app/models/homework.model';

@Component({
  selector: 'app-homework-tab',
  templateUrl: './homework-tab.component.html',
  styleUrls: ['./homework-tab.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonIcon, IonModal, IonInput, IonTextarea,
    CommonModule, ReactiveFormsModule
  ],
})
export class HomeworkTabComponent implements OnInit {
  showHomeworkModal = false;
  homeworkForm: FormGroup;
  homework$: Observable<Homework[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private homeworkService: HomeworkService // Inject service
  ) {
    addIcons({ book, addCircleOutline, pencilOutline, trashOutline, calendarOutline, checkmarkCircle, closeCircle });
    this.homeworkForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      class: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.homework$ = this.homeworkService.homework$;
  }

  openHomeworkModal() {
    this.showHomeworkModal = true;
  }

  closeHomeworkModal() {
    this.showHomeworkModal = false;
    this.homeworkForm.reset();
  }

  addHomework() {
    if (this.homeworkForm.valid) {
      const formValue = this.homeworkForm.value;
      const newHomework: Homework = {
        id: Math.random().toString(36).substring(2, 15),
        title: formValue.title,
        description: formValue.description,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignedBy: 'Current Teacher',
        classId: formValue.class
      };
      this.homeworkService.addHomework(newHomework);
      this.homeworkForm.reset();
      this.closeHomeworkModal();
      console.log('Homework added successfully!');
    } else {
      Object.keys(this.homeworkForm.controls).forEach(key => {
        const control = this.homeworkForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  deleteHomework(id: string) {
    if (confirm('Are you sure you want to delete this homework?')) {
      this.homeworkService.removeHomework(id);
      console.log('Homework deleted successfully!');
    }
  }

  // Utility Methods (could be moved to a shared utility service)
  isFormFieldInvalid(fieldName: string): boolean {
    const field = this.homeworkForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  getFormFieldError(fieldName: string): string {
    const field = this.homeworkForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      if (field.errors['minlength']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too short`;
    }
    return '';
  }
}

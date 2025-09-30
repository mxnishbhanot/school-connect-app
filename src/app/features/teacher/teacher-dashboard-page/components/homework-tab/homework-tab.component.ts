import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  calendar,
  chevronForwardOutline
} from 'ionicons/icons';
import { MdlHomeworkComponent } from 'src/app/shared/components/mdl-homework/mdl-homework.component';
import { CardHomeworkComponent } from 'src/app/shared/components/card-homework/card-homework.component';

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  className: string;
  status: 'pending' | 'completed' | 'in-progress';
  createdAt?: Date;
  updatedAt?: Date;
  progress: number;
}

@Component({
  selector: 'app-homework-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonIcon, MdlHomeworkComponent,
    CardHomeworkComponent,
  ],
  templateUrl: './homework-tab.component.html',
  styleUrls: ['./homework-tab.component.scss']
})
export class HomeworkTabComponent {
  @Input() maxHeight: number = 600;

  homeworkList: Homework[] = [
    {
      id: 1,
      title: "Mathematics - Chapter 5",
      description: "Complete exercises 1-10 on page 45. Focus on algebraic equations and solve the word problems at the end of the chapter.",
      dueDate: "2024-09-20",
      className: "Class 5A",
      status: "pending",
      createdAt: new Date('2024-09-15'),
      progress: 20
    },
    {
      id: 2,
      title: "Science Project",
      description: "Create a detailed solar system model presentation with explanation of each planet's characteristics, distance from sun, and interesting facts.",
      dueDate: "2024-09-25",
      className: "Class 5B",
      status: "pending",
      createdAt: new Date('2024-09-14'),
      progress: 80
    },
    {
      id: 3,
      title: "English Essay",
      description: "Write a 500-word essay on 'My Future Dreams' including personal aspirations, career goals, and how you plan to achieve them.",
      dueDate: "2024-09-18",
      className: "Class 6A",
      status: "completed",
      createdAt: new Date('2024-09-10'),
      progress: 100
    }
  ];
  classesList = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
    { id: '4', name: 'English' },
  ];

  modalForm: FormGroup;
  isModalOpen = false;
  editingHomework: Homework | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    addIcons({
      chevronForwardOutline,
      addOutline
    });

    this.modalForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      className: ['', [Validators.required]],
      status: ['pending', [Validators.required]]
    });
  }

  trackByFn(index: number, item: Homework): number {
    return item.id;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'tomorrow';
    } else {
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= 7) {
        return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
      } else if (diffDays < 0 && diffDays >= -7) {
        return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    }
  }

  openModal() {
    this.resetForm();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingHomework = null;
    this.resetForm();
  }

  resetForm() {
    this.modalForm.reset({
      title: '',
      description: '',
      dueDate: '',
      className: '',
      status: 'pending'
    });
  }

  editHomework(homework: Homework) {
    this.editingHomework = homework;
    this.modalForm.patchValue({
      title: homework.title,
      description: homework.description,
      dueDate: homework.dueDate,
      className: homework.className,
      status: homework.status
    });
    this.isModalOpen = true;
  }

  deleteHomework(id: any) {
    if (confirm('Are you sure you want to delete this homework assignment?')) {
      this.homeworkList = this.homeworkList.filter(h => h.id !== id);
    }
  }

  saveHomework() {
    if (this.modalForm.valid) {
      this.isLoading = true;
      const formData = this.modalForm.value;

      // Simulate API call
      setTimeout(() => {
        if (this.editingHomework) {
          // Update existing homework
          const index = this.homeworkList.findIndex(h => h.id === this.editingHomework!.id);
          if (index !== -1) {
            this.homeworkList[index] = {
              ...this.editingHomework,
              ...formData
            };
          }
        } else {
          // Add new homework
          const newHomework: Homework = {
            id: Math.max(...this.homeworkList.map(h => h.id), 0) + 1,
            ...formData,
            createdAt: new Date()
          };
          this.homeworkList.unshift(newHomework);
        }

        this.isLoading = false;
        this.closeModal();
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.modalForm.controls).forEach(key => {
        this.modalForm.get(key)?.markAsTouched();
      });
    }
  }

  updateHomeworkStatus(homework: Homework) {
    const index = this.homeworkList.findIndex(h => h.id === homework.id);
    if (index !== -1) {
      this.homeworkList[index].status = homework.status === 'pending' ? 'completed' : 'pending';
      this.homeworkList[index].updatedAt = new Date();
    }
  }

  showHomeworkOptions(homework: Homework) {
    alert(`More options for: ${homework.title}`);
  }
}

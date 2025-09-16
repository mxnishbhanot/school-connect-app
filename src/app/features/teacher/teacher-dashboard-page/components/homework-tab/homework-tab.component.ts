// homework-tab.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFab, IonFabButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, trash, close } from 'ionicons/icons';

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  className: string;
  status: 'pending' | 'completed';
  createdAt: Date;
}

@Component({
  selector: 'app-homework-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption
  ],
  templateUrl: './homework-tab.component.html',
  styleUrls: ['./homework-tab.component.scss']
})
export class HomeworkTabComponent {
  @Input() maxHeight: number = 500;

  homeworkList: Homework[] = [
    {
      id: 1,
      title: "Mathematics - Chapter 5",
      description: "Complete exercises 1-10 on page 45. Focus on algebraic equations.",
      dueDate: "2024-09-20",
      className: "Class 5A",
      status: "pending",
      createdAt: new Date('2024-09-15')
    },
    {
      id: 2,
      title: "Science Project",
      description: "Solar system model presentation with detailed explanation of planets.",
      dueDate: "2024-09-25",
      className: "Class 5B",
      status: "pending",
      createdAt: new Date('2024-09-14')
    },
    {
      id: 3,
      title: "English Essay",
      description: "Write a 500-word essay on 'My Future Dreams'",
      dueDate: "2024-09-18",
      className: "Class 6A",
      status: "completed",
      createdAt: new Date('2024-09-10')
    }
  ];

  isModalOpen = false;
  editingHomework: Homework | null = null;
  formData = {
    title: '',
    description: '',
    dueDate: '',
    className: '',
    status: 'pending' as 'pending' | 'completed'
  };

  constructor() {
    addIcons({ add, pencil, trash, close });
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
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
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
    this.formData = {
      title: '',
      description: '',
      dueDate: '',
      className: '',
      status: 'pending'
    };
  }

  editHomework(homework: Homework) {
    this.editingHomework = homework;
    this.formData = {
      title: homework.title,
      description: homework.description,
      dueDate: homework.dueDate,
      className: homework.className,
      status: homework.status
    };
    this.isModalOpen = true;
  }

  deleteHomework(id: number) {
    if (confirm('Are you sure you want to delete this homework assignment?')) {
      this.homeworkList = this.homeworkList.filter(h => h.id !== id);
    }
  }

  saveHomework() {
    if (!this.formData.title || !this.formData.description || !this.formData.dueDate || !this.formData.className) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingHomework) {
      // Update existing homework
      const index = this.homeworkList.findIndex(h => h.id === this.editingHomework!.id);
      if (index !== -1) {
        this.homeworkList[index] = {
          ...this.editingHomework,
          ...this.formData
        };
      }
    } else {
      // Add new homework
      const newHomework: Homework = {
        id: Math.max(...this.homeworkList.map(h => h.id), 0) + 1,
        ...this.formData,
        createdAt: new Date()
      };
      this.homeworkList.unshift(newHomework);
    }

    this.closeModal();
  }
}

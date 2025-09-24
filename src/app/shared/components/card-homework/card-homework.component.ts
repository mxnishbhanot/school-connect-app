import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  schoolOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  createOutline,
  trashOutline,
  ellipsisHorizontal,
  calendarOutline
} from 'ionicons/icons';

interface HomeworkData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  className: string;
  status: 'pending' | 'completed'| 'in-progress';
  createdAt?: Date;
  updatedAt?: Date;
  progress: number;
}

@Component({
  selector: 'app-card-homework',
  templateUrl: './card-homework.component.html',
  styleUrls: ['./card-homework.component.scss'],
  imports: [CommonModule, IonIcon],
  standalone: true,
})
export class CardHomeworkComponent {
  @Input() homework!: HomeworkData;

  @Output() edit = new EventEmitter<HomeworkData>();
  @Output() delete = new EventEmitter<string>();
  @Output() statusToggle = new EventEmitter<HomeworkData>();
  @Output() moreOptions = new EventEmitter<HomeworkData>();

  constructor() {
    addIcons({
      timeOutline,
      schoolOutline,
      checkmarkCircle,
      checkmarkCircleOutline,
      createOutline,
      trashOutline,
      ellipsisHorizontal,
      calendarOutline
    });
  }

  getStatusText(): string {
    return this.homework.status === 'completed' ? 'Completed' : 'Pending';
  }

getStatusClasses() {
  const baseClasses = 'backdrop-blur-sm border border-white/20 shadow-lg';

  switch(this.homework.status) {
    case 'completed':
      return `${baseClasses} bg-gradient-to-r from-green-500 to-emerald-600 text-white`;
    case 'pending':
      return `${baseClasses} bg-gradient-to-r from-yellow-500 to-amber-600 text-white`;
    case 'in-progress':
      return `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-600 text-white`;
    default:
      return `${baseClasses} bg-gradient-to-r from-gray-500 to-gray-600 text-white`;
  }
}

getDueDateUrgency() {
  const baseClasses = 'backdrop-blur-sm border border-white/20 shadow-lg';
  const dueDate = new Date(this.homework.dueDate);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${baseClasses} bg-gradient-to-r from-red-500 to-pink-600 text-white`; // Overdue
  } else if (diffDays === 0) {
    return `${baseClasses} bg-gradient-to-r from-orange-500 to-red-600 text-white`; // Due today
  } else if (diffDays <= 2) {
    return `${baseClasses} bg-gradient-to-r from-amber-500 to-orange-600 text-white`; // Due soon
  } else {
    return `${baseClasses} bg-gradient-to-r from-green-500 to-emerald-600 text-white`; // Normal
  }
}

  getDueDateText(): string {
    const dueDate = new Date(this.homework.dueDate);
    const now = new Date();
    const diffInDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return 'Overdue';
    if (diffInDays === 0) return 'Due Today';
    if (diffInDays === 1) return 'Due Tomorrow';
    if (diffInDays <= 7) return `Due in ${diffInDays} days`;

    return dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  editHomework(): void {
    this.edit.emit(this.homework);
  }

  deleteHomework(): void {
    this.delete.emit(this.homework.id.toString());
  }

  toggleStatus(): void {
    const updatedHomework = {
      ...this.homework,
      status: this.homework.status === 'completed' ? 'pending' as const : 'completed' as const
    };
    this.statusToggle.emit(updatedHomework);
  }

  showMoreOptions(): void {
    this.moreOptions.emit(this.homework);
  }
}

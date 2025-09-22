import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonModal,
  IonIcon,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book, checkmark, closeCircle } from 'ionicons/icons';

// Interface for class data
interface ClassData {
  id: string;
  name: string;
}

// Interface for homework data
interface HomeworkData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  className: string;
  status: 'pending' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

interface HomeworkFormData {
  title: string;
  description: string;
  dueDate: string;
  className: string;
  status: 'pending' | 'completed';
}
@Component({
  selector: 'app-mdl-homework',
  templateUrl: './mdl-homework.component.html',
  styleUrls: ['./mdl-homework.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonModal,
    IonIcon,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonSelect,
    IonSelectOption
  ],
})
export class MdlHomeworkComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  @Input() editingHomework: HomeworkData | null = null;
  @Input() classes: ClassData[] = [];

  @Output() modalClosed = new EventEmitter<void>();
  @Output() homeworkSaved = new EventEmitter<HomeworkData>();
  @Output() homeworkUpdated = new EventEmitter<HomeworkData>();

  modalForm!: FormGroup;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  showDateTime = false;
  today = new Date().toISOString();

  constructor(private fb: FormBuilder) {
    this.initializeForm();
    addIcons({
      checkmark, closeCircle, book
    });
  }

  ngOnInit(): void {
    this.modalForm.valueChanges.subscribe(values => {
      this.onFormValueChange(values);
    });
    this.setupFormForMode();
  }

  /**
   * Initialize the reactive form with validation
   */
  private initializeForm(): void {
    this.modalForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]
      ],
      dueDate: [
        '',
        [Validators.required]
      ],
      className: [
        '',
        [Validators.required]
      ],
      status: [
        'pending',
        [Validators.required]
      ]
    });
  }

  /**
   * Setup form based on whether we're editing or creating
   */
  private setupFormForMode(): void {
    console.log(this.editingHomework);

    this.isEditMode = !!this.editingHomework;

    if (this.isEditMode && this.editingHomework) {
      // Populate form with existing homework data
      this.modalForm.patchValue({
        title: this.editingHomework.title,
        description: this.editingHomework.description,
        dueDate: this.editingHomework.dueDate,
        className: this.editingHomework.className,
        status: this.editingHomework.status
      });
    } else {
      // Reset form for new homework
      this.resetForm();
    }
  }

  /**
   * Handle form value changes for real-time validation feedback
   */
  private onFormValueChange(values: HomeworkFormData): void {
    // You can add real-time validation logic here
    // For example, checking due date is not in the past
    if (values.dueDate) {
      const selectedDate = new Date(values.dueDate);
      const now = new Date();

      if (selectedDate < now) {
        this.modalForm.get('dueDate')?.setErrors({
          'pastDate': true
        });
      }
    }
  }

  /**
   * Save or update homework
   */
  async saveHomework(): Promise<void> {
    if (!this.modalForm.valid || this.isLoading) return;

    this.isLoading = true;

    try {
      const formValues = this.modalForm.value as HomeworkFormData;

      // Simulate API call delay
      await this.simulateApiCall();

      const homeworkData: HomeworkData = {
        ...formValues,
        id: this.isEditMode ? (this.editingHomework?.id ?? this.generateId()) : this.generateId(),
        createdAt: this.isEditMode ? this.editingHomework?.createdAt : new Date(),
        updatedAt: new Date()
      };

      // Emit the appropriate event
      if (this.isEditMode) {
        this.homeworkUpdated.emit(homeworkData);
        this.showSuccessMessage('Homework updated successfully!');
      } else {
        this.homeworkSaved.emit(homeworkData);
        this.showSuccessMessage('Homework created successfully!');
      }

      // Close modal after successful save
      setTimeout(() => {
        this.closeModal();
      }, 500);

    } catch (error) {
      console.error('Error saving homework:', error);
      this.showErrorMessage('Failed to save homework. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
    this.modalClosed.emit();
  }

  /**
   * Reset the form to initial state
   */
  private resetForm(): void {
    this.modalForm.reset({
      title: '',
      description: '',
      dueDate: '',
      className: '',
      status: 'pending'
    });

    // Reset form validation state
    Object.keys(this.modalForm.controls).forEach(key => {
      this.modalForm.get(key)?.setErrors(null);
      this.modalForm.get(key)?.markAsUntouched();
    });

    this.isLoading = false;
    this.isEditMode = false;
    this.showDateTime = false;
  }

  /**
   * Generate unique ID for new homework
   */
  private generateId(): number {
    return Math.random();
  }

  /**
   * Simulate API call
   */
  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }

  /**
   * Show success message (you can integrate with toast service)
   */
  private showSuccessMessage(message: string): void {
    console.log('Success:', message);
    // Integrate with your toast/alert service here
    // this.toastService.showSuccess(message);
  }

  /**
   * Show error message (you can integrate with toast service)
   */
  private showErrorMessage(message: string): void {
    console.error('Error:', message);
    // Integrate with your toast/alert service here
    // this.toastService.showError(message);
  }

  onModalWillPresent() {
    this.showDateTime = true;
  }
}

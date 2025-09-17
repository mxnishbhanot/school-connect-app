import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonCard } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  eyeOutline,
  eyeOffOutline,
  personOutline,
  lockClosedOutline,
  logInOutline,
  schoolOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonCard,
  ],
})
export class AuthPageComponent {
  authForm: FormGroup;
  showPassword = false;
  isLoading = false;
  selectedRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({
      chevronBackOutline,
      eyeOutline,
      eyeOffOutline,
      personOutline,
      lockClosedOutline,
      logInOutline,
      schoolOutline
    });

    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const navigation = this.router.currentNavigation();
    this.selectedRole = navigation?.extras?.state?.['role'] || 'student';
    console.log('Selected role:', this.selectedRole);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      const { username, password } = this.authForm.value;

      console.log('Login attempt:', { username, password, role: this.selectedRole });

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        if (this.selectedRole === 'teacher') {
          this.navCtrl.navigateForward('/teacher');
        } else if (this.selectedRole === 'student') {
          this.navCtrl.navigateForward('/student');
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, 2000);

    } else {
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  forgotPassword() {
    console.log('Forgot password clicked');
    // You could show an alert or navigate to forgot password page
    alert('Please contact your school administrator to reset your password.\n\nAdmin Email: admin@schoolconnect.com\nPhone: (555) 123-4567');
  }

  goBack(): void {
    this.navCtrl.back();
  }

  getRoleDisplayName(): string {
    return this.selectedRole === 'teacher' ? 'Teacher' : 'Student';
  }

  getRoleIcon(): string {
    return this.selectedRole === 'teacher' ? 'person-outline' : 'school-outline';
  }
}

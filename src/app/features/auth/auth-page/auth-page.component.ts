import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonInput, IonItem, IonContent, IonSelect, IonButton, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonInput, IonItem, IonContent, IonSelect, IonButton, IonSelectOption],
})
export class AuthPageComponent {
  tab: 'login' | 'signup' = 'login';
  authForm: FormGroup;
  roles = [
    { label: 'Teacher', value: 'teacher' },
    { label: 'Parent', value: 'parent' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  setTab(tab: 'login' | 'signup') {
    this.tab = tab;
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { role } = this.authForm.value;
      localStorage.setItem('role', role);
      if (role === 'teacher') {
        this.router.navigate(['/teacher']);
      } else if (role === 'parent') {
        this.router.navigate(['/parent']);
      } else if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/auth']);
      }
    }
  }
}

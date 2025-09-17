
import { NavController } from '@ionic/angular';
import { ThemeService } from './../../../core/services/theme.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonModal, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack, logOut, lockClosed, chevronForwardOutline,
  moon, sunny, notifications, helpBuoy, checkmark, closeCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, IonModal, IonInput],
})
export class SettingsComponent {
  theme: 'light' | 'dark' = 'light';
  showChangePasswordModal = false;

  // Mock password form data
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  constructor(private themeService: ThemeService, private router: Router, private navController: NavController) {
    addIcons({
      arrowBack, logOut, lockClosed, chevronForwardOutline,
      moon, sunny, notifications, helpBuoy, checkmark, closeCircle
    });
    this.themeService.theme$.subscribe(t => this.theme = t);
  }

  switchTheme() {
    this.themeService.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  goBack() {
    // need history management
    this.navController.navigateBack('/');
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      // Perform logout logic here (e.g., clear tokens, reset state)
      console.log('User logged out');
      this.router.navigate(['/auth']); // Redirect to login page
    }
  }

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
    // Reset form when closing
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  }

  changePassword() {
    // Basic validation
    if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword || !this.passwordForm.confirmNewPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.passwordForm.newPassword !== this.passwordForm.confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    // Here you would typically call a service to update the password
    console.log('Password change requested:', this.passwordForm);
    alert('Password changed successfully!');
    this.closeChangePasswordModal();
  }
}

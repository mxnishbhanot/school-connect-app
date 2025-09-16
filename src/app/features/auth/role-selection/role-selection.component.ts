import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonIcon, IonContent, IonButton, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  schoolOutline,
  personCircleOutline,
  libraryOutline,
  chevronForwardOutline,
  bookOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonContent, IonCard],
})
export class RoleSelectionComponent {
  constructor(private navCtrl: NavController) {
    addIcons({
      'school-outline': schoolOutline,
      'person-outline': personOutline,
      'person-circle-outline': personCircleOutline,
      'library-outline': libraryOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'book-outline': bookOutline,
      // 'academic-cap-outline': academicCapOutline
    });
  }

  selectRole(role: 'teacher' | 'student') {
    // Note: Using in-memory storage instead of localStorage for Claude.ai compatibility
    // In your actual app, you can use localStorage.setItem('role', role);
    setTimeout(() => {
      if (role === 'teacher') {
        this.navCtrl.navigateForward('/auth', { state: { role: 'teacher' } });
      } else {
        this.navCtrl.navigateForward('/auth', { state: { role: 'student' } });
      }
    }, 200);
  }
}

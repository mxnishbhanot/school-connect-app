import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  schoolOutline,
  personCircleOutline,
  libraryOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonContent],
})
export class RoleSelectionComponent {
  constructor(private navCtrl: NavController) {
    addIcons({
      'school-outline': schoolOutline,
      'person-outline': personOutline,
      'person-circle-outline': personCircleOutline,
      'library-outline': libraryOutline,
      'chevron-forward-outline': chevronForwardOutline,
    });
  }

  selectRole(role: 'teacher' | 'student') {
    localStorage.setItem('role', role);
    setTimeout(() => {
      if (role === 'teacher') {
        this.navCtrl.navigateForward('/auth', { state: { role: 'teacher' } });
      } else {
        this.navCtrl.navigateForward('/auth', { state: { role: 'student' } });
      }
    }, 200);
  }
}

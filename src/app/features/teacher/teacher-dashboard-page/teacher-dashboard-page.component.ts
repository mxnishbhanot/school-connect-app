import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  imagesOutline,
  megaphoneOutline,
  settingsOutline
} from 'ionicons/icons';
import { HomeworkTabComponent } from "./components/homework-tab/homework-tab.component";

@Component({
  selector: 'app-teacher-dashboard-page',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, HomeworkTabComponent],
  templateUrl: './teacher-dashboard-page.component.html',
  styleUrls: ['./teacher-dashboard-page.component.scss']
})
export class TeacherDashboardPageComponent {
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  constructor() {
    addIcons({
      bookOutline,
      imagesOutline,
      megaphoneOutline,
      settingsOutline
    });
  }

  setTab(tab: 'homework' | 'gallery' | 'announcements') {
    this.tab = tab;
    console.log('Tab switched to:', tab);
  }

  // Sample methods for different actions
  addHomework() {
    console.log('Add homework clicked');
    // Implement add homework functionality
  }

  uploadPhoto() {
    console.log('Upload photo clicked');
    // Implement photo upload functionality
  }

  newAnnouncement() {
    console.log('New announcement clicked');
    // Implement new announcement functionality
  }

  openSettings() {
    console.log('Settings clicked');
    // Implement settings functionality
  }
}

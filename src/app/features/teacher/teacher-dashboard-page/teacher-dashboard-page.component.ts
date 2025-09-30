import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';
import {
  bookOutline,
  imagesOutline,
  megaphoneOutline,
} from 'ionicons/icons';
import { HomeworkTabComponent } from "./components/homework-tab/homework-tab.component";
import { GalleryTabComponent } from './components/gallery-tab/gallery-tab.component';
import { AnnouncementsTabComponent } from './components/announcements-tab/announcements-tab.component';
import { TabNavigationComponent } from 'src/app/shared/components/tab-navigation/tab-navigation.component';
import { TabHeaderComponent } from 'src/app/shared/components/tab-header/tab-header.component';

@Component({
  selector: 'app-teacher-dashboard-page',
  standalone: true,
  imports: [CommonModule, IonContent, HomeworkTabComponent, GalleryTabComponent, AnnouncementsTabComponent, TabNavigationComponent, TabHeaderComponent],
  templateUrl: './teacher-dashboard-page.component.html',
  styleUrls: ['./teacher-dashboard-page.component.scss']
})
export class TeacherDashboardPageComponent {
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  constructor(private navController: NavController) {
    addIcons({
      bookOutline,
      imagesOutline,
      megaphoneOutline
    });
  }

  setTab(tab: any) {
    this.tab = tab;
    console.log('Tab switched to:', tab);
  }
}

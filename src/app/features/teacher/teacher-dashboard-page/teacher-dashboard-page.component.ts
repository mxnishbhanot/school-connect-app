import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent , IonTab} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, imagesOutline, megaphoneOutline } from 'ionicons/icons';
import { HomeworkTabComponent } from './components/homework-tab/homework-tab.component';
import { GalleryTabComponent } from './components/gallery-tab/gallery-tab.component';
import { AnnouncementsTabComponent } from './components/announcements-tab/announcements-tab.component';

@Component({
  selector: 'app-teacher-dashboard-page',
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonTab, HomeworkTabComponent, GalleryTabComponent, AnnouncementsTabComponent],
  templateUrl: './teacher-dashboard-page.component.html',
  styleUrls: ['./teacher-dashboard-page.component.scss']
})
export class TeacherDashboardPageComponent {
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  constructor() {
    addIcons({ bookOutline, imagesOutline, megaphoneOutline });
  }

  setTab(tab: 'homework' | 'gallery' | 'announcements') {
    this.tab = tab;
  }
}

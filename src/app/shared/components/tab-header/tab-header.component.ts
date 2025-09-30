import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, notificationsOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class TabHeaderComponent implements OnInit {
  userName = 'Sarah';
  greeting = '';

  constructor(private navController: NavController) {}

  ngOnInit() {
    addIcons({
      settingsOutline,
      notificationsOutline
    });
    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good Morning';
    else if (hour < 18) this.greeting = 'Good Afternoon';
    else this.greeting = 'Good Evening';
  }

  openSettings() {
    this.navController.navigateForward('/settings');
  }

  openNotifications() {
    this.navController.navigateForward('/notifications');
  }
}

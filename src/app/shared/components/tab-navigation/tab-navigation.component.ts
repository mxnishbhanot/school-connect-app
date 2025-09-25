import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule]
})
export class TabNavigationComponent {
  @Input() activeTab: string = 'homework';
  @Output() tabChange = new EventEmitter<string>();

  tabs = [
    {
      key: 'homework',
      label: 'Homework',
      icon: 'book-outline',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      key: 'gallery',
      label: 'Gallery',
      icon: 'images-outline',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      key: 'announcements',
      label: 'Announcements',
      icon: 'megaphone-outline',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  setTab(tabKey: string) {
    this.activeTab = tabKey;
    this.tabChange.emit(tabKey);
  }
}


import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-icon',
  template: `<button (click)="goToSettings()" class="bg-white rounded-full p-2 shadow-soft hover:bg-mint transition-all" title="Settings">
    <span class="text-xl">⚙️</span>
  </button>`,
  standalone: true,
})
export class SettingsIconComponent {
  @Input() lastRoute: string = '/';
  constructor(private router: Router) {}

  goToSettings() {
    localStorage.setItem('lastRoute', this.router.url);
    this.router.navigate(['/settings']);
  }
}

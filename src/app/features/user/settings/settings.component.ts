import { ThemeService } from './../../../core/services/theme.service';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SettingsComponent {
  theme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService, private router: Router) {
    this.themeService.theme$.subscribe(t => this.theme = t);
  }

  switchTheme() {
    this.themeService.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  goBack() {
    const lastRoute = localStorage.getItem('lastRoute') || '/';
    this.router.navigateByUrl(lastRoute);
  }
}

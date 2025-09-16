import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    return this.router.url.startsWith('/auth');
  }
}

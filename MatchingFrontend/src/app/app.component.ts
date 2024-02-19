import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewPlayerModalComponent } from './new-player-modal/new-player-modal.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NewPlayerModalComponent,
    RouterModule,
  ],
  // templateUrl: './app.component.html',
  template: `
  <main>
    <a [routerLink]="['/']">
      <!-- <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header> -->
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Matching Game';
}

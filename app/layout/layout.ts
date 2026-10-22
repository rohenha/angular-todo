import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../app/header/header';
import { FooterComponent } from '../app/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
      <app-header/>
      <main class="main">
        <div class="container">
          <router-outlet />
        </div>
      </main>
      <app-footer/>

  `,
  styles: [`
    .main {
      flex: 1;
      padding: 2rem 0;
    }
  `],
})
export class LayoutComponent {}
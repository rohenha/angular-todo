import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="home">
      <h1>Angular + Nitro Starter</h1>
      <p>Prêt à développer.</p>
    </main>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 2rem;
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { color: #666; }
  `],
})
export class HomeComponent {}
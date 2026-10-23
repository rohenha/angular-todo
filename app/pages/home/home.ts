import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="o-home">
      <p class="o-home__eyebrow">Nitro + Angular</p>
      <h1 class="o-home__title">Faites place à l'essentiel.</h1>
      <p class="o-home__lead">
        Une liste de tâches claire et rapide. Ajoutez, cochez, avancez — sans distraction.
      </p>
      <div class="o-home__actions">
        <a class="a-button" routerLink="/todos">Ouvrir mes todos</a>
      </div>
    </section>
  `,
  styles: [`
    .o-home {
      max-width: 620px;
      margin: 0 auto;
      padding: clamp(40px, 11vh, 128px) 0 24px;
      text-align: center;
    }

    .o-home__eyebrow {
      color: var(--accent);
      font-size: var(--text-footnote);
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .o-home__title {
      margin-top: 14px;
      font-size: clamp(2.5rem, 8vw, 3.5rem);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.04em;
      text-wrap: balance;
    }

    .o-home__lead {
      max-width: 460px;
      margin: 20px auto 0;
      color: var(--text-2);
      font-size: 1.1875rem;
      line-height: 1.5;
      text-wrap: pretty;
    }

    .o-home__actions {
      margin-top: 36px;
    }
  `],
})
export class HomeComponent {}

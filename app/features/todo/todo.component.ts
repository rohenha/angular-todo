import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-page">
      <h1>Mes Todos</h1>
      
      <form (ngSubmit)="addTodo()" class="todo-form">
        <input
          type="text"
          [(ngModel)]="newTodoTitle"
          name="newTodo"
          placeholder="Ajouter une tâche..."
          required
        />
        <button type="submit" [disabled]="!newTodoTitle.trim()">Ajouter</button>
      </form>

      <ul class="todo-list">
        @for (todo of todos(); track todo.id) {
          <li class="todo-item" [class.completed]="todo.completed">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo)"
            />
            <span>{{ todo.title }}</span>
            <button (click)="deleteTodo(todo.id)" class="delete-btn">Supprimer</button>
          </li>
        } @empty {
          <li class="empty">Aucune tâche</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .todo-page {
      max-width: 600px;
      margin: 0 auto;
    }
    .todo-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .todo-form input {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
    }
    .todo-form button {
      padding: 0.5rem 1rem;
    }
    .todo-list {
      list-style: none;
      padding: 0;
    }
    .todo-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background-color: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 0.5rem;
    }
    .todo-item.completed span {
      text-decoration: line-through;
      color: var(--border);
    }
    .delete-btn {
      margin-left: auto;
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-size: 0.875rem;
    }
    .delete-btn:hover {
      background: var(--primary-hover);
    }
    .empty {
      text-align: center;
      color: var(--border);
      padding: 2rem;
    }
  `],
})
export class TodoComponent {
  todos = signal<Todo[]>([
    { id: '1', title: 'Apprendre Nitro', completed: true },
    { id: '2', title: 'Configurer Angular', completed: false },
    { id: '3', title: 'Créer une API REST', completed: false },
  ]);
  newTodoTitle = '';

  addTodo() {
    const title = this.newTodoTitle.trim();
    if (!title) return;

    this.todos.update((t) => [...t, { id: Date.now().toString(), title, completed: false }]);
    this.newTodoTitle = '';
  }

  toggleTodo(todo: Todo) {
    this.todos.update((t) => t.map((td) => td.id === todo.id ? { ...td, completed: !td.completed } : td));
  }

  deleteTodo(id: string) {
    this.todos.update((t) => t.filter((td) => td.id !== id));
  }
}
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService, type Todo } from '../../services/TodosService';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class TodosComponent {
  private newTodoTitle = '';
  private editTodoId = '';
  private editTodoTitle = '';
  private readonly todoService = inject(TodosService);
  private readonly todosResource = this.todoService.todosResource;
  
  private readonly todos = computed(() => this.todosResource.value());

  readonly total = computed(() => this.todos().length);

  readonly completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length,
  );

  readonly remainingCount = computed(() => this.total() - this.completedCount());

  readonly remainingLabel = computed(() => {
    const remaining = this.remainingCount();
    if (this.total() === 0) return 'Aucune tâche pour le moment';
    if (remaining === 0) return 'Tout est terminé';
    return `${remaining} ${remaining > 1 ? 'restantes' : 'restante'}`;
  });

  readonly progressLabel = computed(
    () => `${this.completedCount()} tâches terminées sur ${this.total()}`,
  );

  readonly ringDash = computed(() => {
    const circumference = 2 * Math.PI * 15.5;
    const ratio = this.total() === 0 ? 0 : this.completedCount() / this.total();
    return `${circumference * ratio} ${circumference}`;
  });

  addTodo(): void {
    const title = this.newTodoTitle.trim();
    if (!title) return;

    this.todoService.createTodo({ title }).subscribe({
      next: () => {
        this.newTodoTitle = '';
        this.todosResource.reload();
      },
      error: (error) => console.error('createTodo failed', error),
    });
  }

  updateTodo(): void {
    const title = this.editTodoTitle.trim();
    if (!title) return;
    this.todoService.updateTodo(this.editTodoId, { title: title }).subscribe({
      next: () => {
        this.editTodoId = ''
        this.editTodoTitle = ''
        this.todosResource.reload()
      }
    })
  }

  clearTodo(): void {
    this.editTodoId = ''
    this.editTodoTitle = ''
  }

  editTodo(todo: Todo): void {
    this.editTodoId = todo.id
    this.editTodoTitle = todo.title
  }

  toggleTodo(todo: Todo): void {
    this.todoService
      .updateTodo(todo.id, { completed: !todo.completed })
      .subscribe({
        next: () => this.todosResource.reload(),
        error: (error) => console.error('updateTodo failed', error),
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.todosResource.reload(),
      error: (error) => console.error('deleteTodo failed', error),
    });
  }
}

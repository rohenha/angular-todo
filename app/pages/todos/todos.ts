import { AsyncPipe } from '@angular/common';
import { Component, computed, signal, inject, type OnInit, type Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, reduce, type Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodosService } from '../../services/TodosService';
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class TodosComponent implements OnInit{
  todos!: Signal<Todo[]>
  newTodoTitle = ''
  private readonly todoService = inject(TodosService);

  constructor() {
    this.todos = toSignal(this.todoService.getAllTodos(), { initialValue: [] as Todo[] });
  }

  ngOnInit(): void {
  }
  // readonly todos = signal<Todo[]>([
  //   { id: '1', title: 'Apprendre Nitro', completed: true },
  //   { id: '2', title: 'Configurer Angular', completed: false },
  //   { id: '3', title: 'Créer une API REST', completed: false },
  // ]);

  readonly total = computed(() => this.todos().length);

  readonly completedCount = computed(
    () => this.todos().filter((todo: Todo) => todo.completed).length
    // () => this.todos$.pipe(filter((todos) => todos.filter((todo) => todo.completed))).length
    // () => this.todos$.filter((todo: Todo) => todo.completed).length,
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

  addTodo() {
    // const title = this.newTodoTitle.trim();
    // if (!title) return;

    // this.todos.update((todos) => [
    //   ...todos,
    //   { id: crypto.randomUUID(), title, completed: false },
    // ]);
    // this.newTodoTitle = '';
  }

  toggleTodo(todo: Todo) {
    // this.todos.update((todos) =>
    //   todos.map((item) =>
    //     item.id === todo.id ? { ...item, completed: !item.completed } : item,
    //   ),
    // );
  }

  deleteTodo(id: string) {
    // this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}

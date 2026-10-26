import { HttpClient, httpResource } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  
  private readonly http = inject(HttpClient);

  readonly todosResource = httpResource<Todo[]>(
    () => '/api/todos',
    { defaultValue: [] }
  );

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todos')
  }

  createTodo({ title }: { title: string }): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/api/todos/create', {
      title
    })
  }

  updateTodo(id: string, { title, completed }: { title?: string, completed?: boolean }): Observable<Todo> {
    return this.http.patch<Todo>(`http://localhost:3000/api/todos/${id}`, {
      title,
      completed
    })
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`http://localhost:3000/api/todos/${id}`)
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`http://localhost:3000/api/todos/${id}`)
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, type Observable } from "rxjs";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export default class TodosService {
  
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/api/todos')
  }
}
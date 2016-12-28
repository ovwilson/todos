import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Todo, AppState } from "./models/todo";
import { SHOW_ALL } from "./reducers/filter";
import "../../public/styles.css";
import "./../rxjs-extensions";

@Component({
    selector: "body",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
    appState: Observable<AppState> = Observable.of<AppState>();
    todos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    filteredTodos$: Observable<any>;
    filter = SHOW_ALL;
    todo: string = "";

    constructor(private store: Store<Todo[]>) {
        this.todos$ = store.select("todos");
        this.filteredTodos$ = store.select("filter");
        this.todos$.subscribe(todos => this.store.dispatch({ type: this.filter, payload: { todos: todos } }));
    }

    ngOnInit(){
        this.store.dispatch({type:"GET_TODOS"});
    }

    addTodo() {
        this.store.dispatch({ type: "ADD_TODO", payload: { description: this.todo, complete:false } });
        this.todo = "";        
    }

    toggleTodo(todo: Todo) {
        this.store.dispatch({ type: "TOGGLE_TODO", payload: todo });
    }

    filterTodo(filter: string) {
        this.filter = filter;
        this.store.select("todos").subscribe(todos => this.store.dispatch({ type: filter, payload: { todos: todos } }));
    }

}
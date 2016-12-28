import { Component } from "@angular/core";
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

export class AppComponent {
    appState: Observable<AppState> = Observable.of<AppState>();
    todos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    filter$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    filteredTodos$: Observable<AppState[]> = Observable.of<AppState[]>([]);
    filter = SHOW_ALL;
    todo: string = "";

    constructor(private store: Store<Todo[]>) {
        this.todos$ = store.select("todos");
        this.filter$ = store.select("filter");
        //this.todos$.subscribe(todos => this.store.dispatch({ type: this.filter, payload: { todos: todos } }));

        this.filteredTodos$ = Observable.combineLatest(this.todos$, this.filter$, (todos: Array<Todo>, filter: Array<Todo>) => {
            return {
                filter:Todo[]
            }
        });
    }

    addTodo() {
        this.store.dispatch({ type: "ADD_TODO", payload: { description: this.todo } });
        this.todo = "";
    }

    toggleTodo(todo: Todo) {
        this.store.dispatch({ type: "TOGGLE_TODO", payload: todo });
    }

    filterTodo(filter: string) {
        this.filter = filter;
        this.store.dispatch({ type: filter });

    }

}
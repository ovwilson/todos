import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Todo } from "./models/todo";
import { SHOW_ALL } from "./reducers/filter";
import { GET_TODOS, LISTEN_TO_TODOS, ADD_TODO, TOOGLE_TODO, REMOVE_TODO } from "./actions/actions";
import "../../public/styles.css";
import "./../rxjs-extensions";

@Component({
    selector: "body",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
    todos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    filteredTodos$: Observable<any>;
    filter = SHOW_ALL;
    todo: string = "";

    constructor(private store: Store<Todo[]>) {
        this.todos$ = store.select("todos");
        this.filteredTodos$ = store.select("filter");
        this.todos$.subscribe(todos => this.store.dispatch({ type: this.filter, payload: { todos: todos } }));
    }

    ngOnInit() {
        this.store.dispatch({type: LISTEN_TO_TODOS});
        // this.store.dispatch({ type: GET_TODOS });
    }

    addTodo() {
        this.store.dispatch({ type: ADD_TODO, payload: { description: this.todo, complete: false } });
        this.todo = "";
    }

    toggleTodo(todo: Todo) {
        this.store.dispatch({ type: TOOGLE_TODO, payload: todo });
    }

    filterTodo(filter: string) {
        this.filter = filter;
        this.store.select("todos").subscribe(todos => this.store.dispatch({ type: filter, payload: { todos: todos } }));
    }

    removeTodo(todo: Todo) {
        this.store.dispatch({ type: REMOVE_TODO, payload: todo });
    }

    refreshTodos(){
        this.store.dispatch({type: GET_TODOS});
    }

}
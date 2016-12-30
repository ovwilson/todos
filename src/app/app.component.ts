import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Todo } from "./models/todo";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "./reducers/filter";
import { GET_TODOS, LISTEN_TO_TODOS, ADD_TODO, TOOGLE_TODO, REMOVE_TODO, REMOVE_COMPLETED_TODOS } from "./actions/actions";
import "../../public/styles.css";
import "./../rxjs-extensions";

declare var window: any;

@Component({
    selector: "body",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {

    todos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    filteredTodos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    countOfTodosLeft: number;
    filter: string = SHOW_ALL;
    todo: string = "";

    constructor(private store: Store<Todo[]>) {
        this.todos$ = store.select("todos");
        this.filteredTodos$ = store.select("filter");
        this.setFilter(this.filter);
    }

    ngOnInit() {
        this.store.dispatch({ type: LISTEN_TO_TODOS });
        switch (window.location.hash) {
            case "#active": this.filterTodo(SHOW_ACTIVE); break;
            case "#completed": this.filterTodo(SHOW_COMPLETED); break;
            default: break;
        }
    }

    filterTodo(filter: string) {
        this.setFilter(filter);
        this.setTabs();
    }

    setFilter(filter: string) {
        this.todos$.subscribe(todos => {
            this.countOfTodosLeft = todos.filter(todo => !todo.complete).length;
            this.store.dispatch({ type: filter, payload: { todos: todos } })
        });
    }

    addTodo() {
        this.store.dispatch({ type: ADD_TODO, payload: { description: this.todo, complete: false } });
        this.resetTodo();
    }

    resetTodo() {
        this.todo = "";
    }

    toggleTodo(todo: Todo) {
        this.store.dispatch({ type: TOOGLE_TODO, payload: todo });
    }

    

    removeTodo(todo: Todo) {
        this.store.dispatch({ type: REMOVE_TODO, payload: todo });
    }

    clearCompleted() {
        this.store.dispatch({ type: REMOVE_COMPLETED_TODOS });
    }

    refreshTodos() {
        this.store.dispatch({ type: GET_TODOS });
    }    

    setTabs() {
        setTimeout(() => window.$("ul.tabs").tabs());
    }


}
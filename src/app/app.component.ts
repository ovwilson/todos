import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Todo } from "./models/todo";

import "../../public/styles.css";
import "../rxjs-extensions";

@Component({
    selector: "body",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent {

    todos$: Observable<Todo[]> = Observable.of<Todo[]>([]);
    todo: string;

    constructor(private store: Store<Todo[]>) {
        this.todos$ = store.select("todos");
    }

    addTodo() {
        this.todo !== "" ? this.store.dispatch({ type: "ADD_TODO", payload: { description: this.todo } }) : "";
        this.resetTodo();
    }

    resetTodo(){
        this.todo = "";
    }

}
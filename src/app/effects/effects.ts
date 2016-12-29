import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Todo } from "./../models/todo";
import {
    LISTEN_TO_TODOS,
    GET_TODOS,
    RECEIVE_GET_TODOS,
    ADD_TODO,
    RECEIVE_ADD_TODO,
    REMOVE_TODO,
    RECEIVE_REMOVE_TODO,
    TOOGLE_TODO,
    RECEIVE_TOOGLE_TODO,
    REMOVE_COMPLETED_TODOS
} from "./../actions/actions";

import "./../../rxjs-extensions";

declare var firebase: any;

@Injectable()
export class firebaseEffects {

    constructor(private actions$: Actions, private store: Store<any>) { }

    @Effect({ dispatch: false }) listenForTodos$ = this.actions$.ofType(LISTEN_TO_TODOS)
        .do(() => {

            // Listen for added values
            firebase.database().ref("/data").on("child_added", (snapshot) => {
                console.log("child_added:", snapshot.val());
                this.store.dispatch({ type: RECEIVE_ADD_TODO, payload: { key: snapshot.key, data: snapshot.val() } });
            });

            // Listen for changed values
            firebase.database().ref("/data").on("child_changed", (snapshot) => {
                console.log("child_changed:", snapshot.val());
                this.store.dispatch({ type: RECEIVE_TOOGLE_TODO, payload: { key: snapshot.key, data: snapshot.val() } });
            });

            // Listen for Removed values
            firebase.database().ref("/data").on("child_removed", (snapshot) => {
                console.log("child_removed:", snapshot.val());
                this.store.dispatch({ type: RECEIVE_REMOVE_TODO, payload: { key: snapshot.key, data: snapshot.val() } });
            });
        });

    @Effect({ dispatch: false }) getTodos$ = this.actions$.ofType(GET_TODOS)
        .do(() => {
            firebase.database().ref("/data").once("value").then((snapshot) => {
                const todos: Todo[] = [];
                snapshot.forEach(todo => {
                    todos.push(Object.assign({}, {
                        id: todo.key,
                        description: todo.val().description,
                        complete: todo.val().complete
                    }));
                });
                this.store.dispatch({ type: RECEIVE_GET_TODOS, payload: todos });
            });
        });

    @Effect({ dispatch: false }) toggleTodos$ = this.actions$.ofType(TOOGLE_TODO)
        .do((action: Action) => {
            firebase.database().ref("/data/" + action.payload.id).set({
                description: action.payload.description,
                complete: !action.payload.complete
            });
        });

    @Effect({ dispatch: false }) addTodos$ = this.actions$.ofType(ADD_TODO)
        .do((action: Action) => {
            firebase.database().ref("/data").push({ description: action.payload.description, complete: action.payload.complete });
        });

    @Effect({ dispatch: false }) removeTodos$ = this.actions$.ofType(REMOVE_TODO)
        .do((action: Action) => {
            firebase.database().ref("/data").child(action.payload.id).remove();
        });

    @Effect({ dispatch: false }) clearCompletedTodos$ = this.actions$.ofType(REMOVE_COMPLETED_TODOS)
        .withLatestFrom(this.store, (action, state) => state.todos)
        .flatMap((todos: Todo[]) => todos)
        .filter((todo: Todo) => todo.complete)
        .do((todo) => this.store.dispatch({ type: REMOVE_TODO, payload: todo }));

}
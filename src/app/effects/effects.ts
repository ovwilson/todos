import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { GET_TODOS, RECEIVE_GET_TODOS, ADD_TODO, RECEIVE_ADD_TODO } from "./../actions/actions";

declare var firebase: any;

@Injectable()
export class firebaseEffects {

    constructor(private actions$: Actions, private store: Store<any>) { }

    @Effect({ dispatch: false }) getTodos$ = this.actions$.ofType(GET_TODOS)
        .do(() => {
            firebase.database().ref("/data").on("child_added", (snapshot) => {
                const todo = Object.assign({}, {
                    id: snapshot.key,
                    description: snapshot.val().description,
                    complete: snapshot.val().complete
                });
                this.store.dispatch({ type: RECEIVE_GET_TODOS, payload: todo });
            });
        });

    @Effect({ dispatch: false }) addTodos$ = this.actions$.ofType(ADD_TODO)
        .do((action: Action) => {
            firebase.database().ref("/data").push({ description: action.payload.description, complete: action.payload.complete });
        });

}
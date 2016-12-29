import { ActionReducer, Action } from '@ngrx/store';
import { Todo } from "./../models/todo";

export const SHOW_COMPLETED = "SHOW_COMPLETED";
export const SHOW_ACTIVE = "SHOW_ACTIVE";
export const SHOW_ALL = "SHOW_ALL";

const initialState: Todo[] = [];

export const filter: ActionReducer<Todo[]> = (state: Todo[] = initialState, action: Action) => {
    switch (action.type) {
        case SHOW_ALL:
            return action.payload.todos;
        case SHOW_COMPLETED:
            return action.payload.todos.filter(todo => todo.complete);
        case SHOW_ACTIVE:
            return action.payload.todos.filter(todo => !todo.complete);
         default:
            return state;
    }
}


import { ActionReducer, Action } from '@ngrx/store';
import { Todo } from "./../models/todo";

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

const initialState: Todo[] = [];

export const todos: ActionReducer<Todo[]> = (state: Todo[] = initialState, action: Action) => {
    switch (action.type) {
        case ADD_TODO:
            return action.payload.value !== "" ? [...state, { id: Math.floor(Math.random() * 1000), description: action.payload.description, complete: false }] : state;
        case TOGGLE_TODO:
            return state.map(todo => {
                return todo.id !== action.payload.id ? todo : Object.assign({}, todo, {
                    id: action.payload.id,
                    description: action.payload.description,
                    complete: !todo.complete
                });
            });
        default:
            return state;
    }
}


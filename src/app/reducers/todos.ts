import { ActionReducer, Action } from '@ngrx/store';
import { Todo } from "./../models/todo";

export const ADD_TODO = "ADD_TODO";
export const RESET_TODO = "RESET_TODO";

const initialState: Todo[] = [];

export const todos: ActionReducer<Todo[]> = (state: Todo[] = [], action: Action) => {
    switch (action.type) {
        case ADD_TODO:
            action.payload.id = state.length;
            return [...state, action.payload];
        case RESET_TODO:
            return state;
        default:
            return state;
    }
}
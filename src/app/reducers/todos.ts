import { ActionReducer, Action } from "@ngrx/store";
import { Todo } from "./../models/todo";
import { RECEIVE_GET_TODOS, RECEIVE_ADD_TODO, RECEIVE_REMOVE_TODO, RECEIVE_TOOGLE_TODO } from "./../actions/actions";

const initialState: Todo[] = [];

export const todos: ActionReducer<Todo[]> = (state: Todo[] = initialState, action: Action) => {
    switch (action.type) {
        case RECEIVE_GET_TODOS:
            return action.payload;
        case RECEIVE_ADD_TODO:
            const todo = Object.assign({}, {
                id: action.payload.key,
                description: action.payload.data.description,
                complete: action.payload.data.complete
            });
            return [...state, todo];
        case RECEIVE_TOOGLE_TODO:
            return state.map(todo => {
                return todo.id !== action.payload.key ? todo : Object.assign({}, todo, {
                    id: action.payload.id,
                    description: action.payload.data.description,
                    complete: action.payload.data.complete
                });
            });
        case RECEIVE_REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload.key);
        default:
            return state;
    }
}


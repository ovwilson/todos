import { ActionReducer, Action } from "@ngrx/store";
import { Todo } from "./../models/todo";
import { RECEIVE_GET_TODOS, RECEIVE_ADD_TODO, TOGGLE_TODO } from "./../actions/actions";

const initialState: Todo[] = [];



export const todos: ActionReducer<Todo[]> = (state: Todo[] = initialState, action: Action) => {
    switch (action.type) {
        case RECEIVE_GET_TODOS:            
            return [...state,action.payload];
        case RECEIVE_ADD_TODO:
            return [...state, action.payload ];
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


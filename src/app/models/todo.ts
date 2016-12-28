import { Observable } from "rxjs/Observable";

export interface Todo {
    id?: number,
    description?: string,
    complete?:boolean
}

export interface AppState {
    filter: Todo[]
}
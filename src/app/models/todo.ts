export interface Todo {
    id?: string,
    description?: string,
    complete?: boolean
}

export interface AppState {
    filter: Todo[]
}

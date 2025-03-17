export type Todo = {
    title: string;
    id: number;
    isDone: boolean;
    created: string;
};


export type Info = {
    all: number
    completed: number
    inWork: number
}
export type TodoApiResponse = {
    data: Todo[];
    info: Info;
};
import axios from 'axios';
import {Todo, TodoApiResponse} from "../types/todos.ts";
import { Filters } from "../types/filters.ts";

const apiTodoClient = axios.create({
    baseURL: 'https://easydev.club/api/v1',
});

export async function addTodo(addTodoData: { title: string; isDone: boolean }): Promise<Todo> {
    const response = await apiTodoClient.post('/todos', addTodoData);
    return response.data;
}

export async function updateTodo(id: number, data: { title: string; isDone: boolean }): Promise<Todo> {
    const response = await apiTodoClient.put(`/todos/${id}`, data);
    return response.data;
}

export async function deleteTodo(id: number): Promise<string> {
    const response = await apiTodoClient.delete(`/todos/${id}`);
    return response.data;
}

export async function getTodos(filter: Filters = 'all'): Promise<TodoApiResponse> {
    const response = await apiTodoClient.get('/todos', { params: { filter } });
    return response.data;
}

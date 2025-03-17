import axios from 'axios';
import {Todo, TodoApiResponse} from "../types/todos.ts";
import { Filters } from "../types/filters.ts";

const apiClient = axios.create({
    baseURL: 'https://easydev.club/api/v1',
});

export async function addTodo(addTodoData: { title: string; isDone: boolean }): Promise<Todo> {
    const response = await apiClient.post('/todos', addTodoData);
    return response.data;
}

export async function updateTodo(id: number, data: { title: string; isDone: boolean }): Promise<Todo> {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response.data;
}

export async function deleteTodo(id: number): Promise<string> {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
}

export async function getTodos(filter: Filters = 'all'): Promise<TodoApiResponse> {
    const response = await apiClient.get('/todos', { params: { filter } });
    return response.data;
}

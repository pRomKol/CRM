import {useState} from 'react';
import {useQuery} from 'react-query';
import {TodoContent} from "../../components/todoContent/TodoContent.tsx";
import {getTodos} from "../../api/todo.api.ts";
import {Filters} from "../../types/filters.ts";
import {TodoFiltersList} from "../../components/filters/TodoFiltersList.tsx";
import {notification} from "antd";
import {TodoApiResponse} from "../../types/todos.ts";
import {AddTask} from "../../components/addTAsk/AddTask.tsx";


export const TodoList = () => {
    const [currentFilter, setCurrentFilter] = useState<Filters>('all');

    const { data, isLoading, refetch } = useQuery<TodoApiResponse>(
        ['todos', currentFilter],
        () => getTodos(currentFilter),

        {
            onError: (error: unknown) => {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                notification.error({
                    message: 'Error',
                    description: errorMessage,
                });
            },
            refetchInterval: 5000,
        }
    );

    if (isLoading) {
        return <div>'Loader component'</div>;
    }
    const { data: todos = [], info = {all: 0, inWork: 0, completed: 0} } = data || {};
    return (
        <div>
            <AddTask getTodosByCurrentFilter={refetch} />
            <TodoFiltersList
                currentFilter={currentFilter}
                info={info}
                setCurrentFilter={setCurrentFilter}
            />
            <TodoContent
                getTodosByCurrentFilter={refetch}
                todos={todos}
            />
        </div>
    );
};
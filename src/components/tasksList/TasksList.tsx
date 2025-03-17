import {Task} from "../task/Task.tsx";
import {Todo} from "../../types/todos.ts";


type TasksListProps = {
    todos: Todo[]
    getTodosByCurrentFilter:() => void
}


export const TasksList = (props: TasksListProps) => {
return (
        <ul style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px'}}>
            {props.todos.map((todo) => (
                <Task
                    key={todo.id}
                    id={todo.id}
                    isDone={todo.isDone}
                    title={todo.title}
                    getTodosByCurrentFilter={props.getTodosByCurrentFilter} />
            ))}
        </ul>
    );
};
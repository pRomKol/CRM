import {TasksList} from "../tasksList/TasksList.tsx";
import {Todo} from "../../types/todos.ts";



type MainSectionPropsType = {
    todos: Todo[];
    getTodosByCurrentFilter: () => void
};

export const TodoContent = (props: MainSectionPropsType) => {
    return (
        <>
            <TasksList
                todos={props.todos}
                getTodosByCurrentFilter={props.getTodosByCurrentFilter}/>
        </>
    );
};
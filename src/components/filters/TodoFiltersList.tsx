import { useQueryClient } from 'react-query';
import {Filters,} from "../../types/filters.ts";
import {Info} from "../../types/todos.ts";
import '../filters/filters.css'

type FiltersList = {
    name: string;
    filterName: Filters;
    length: number;
};
type FilterProps = {
    info: Info;
    setCurrentFilter: (filter: Filters) => void;
    currentFilter: Filters;
};

export const TodoFiltersList = (props: FilterProps) => {
    const queryClient = useQueryClient();
    const filtersList: FiltersList[] = [
        {
            name: 'Все',
            filterName: 'all',
            length: props.info.all,
        },
        {
            name: 'В работе',
            filterName: 'inWork',
            length: props.info.inWork,
        },
        {
            name: 'Сделано',
            filterName: 'completed',
            length: props.info.completed,
        },
    ];

    const  changeFilter = async (filterName: Filters) => {
        props.setCurrentFilter(filterName);
       await queryClient.invalidateQueries(['todos', filterName]);
    };

    return (
        <ul className = 'filters'>
            {filtersList.map((el, index) => (
                <li
                    key={index}
                    onClick={() => changeFilter(el.filterName)}
                    className={`${props.currentFilter === el.filterName ? 'active' : ''}`}
                >
                    {el.name} ({el.length})
                </li>
            ))}
        </ul>
    );
};
import { FocusEvent } from "react";

interface ToDoItemProps {
    id: string;
    name: string;
    onValueChange: (id: string, name: string) => void;
    onDeleteClick: (id: string) => void;
}

function ToDoItem(props: ToDoItemProps) {
    let originalString = props.name;

    let onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (originalString != e.target.value) {
            props.onValueChange(props.id, e.target.value);
        }
    };

    return (
        <div className="flex border rounded border-slate-300 mb-2 group">
            <input
                className="w-full outline-none px-3 py-2 "
                defaultValue={props.name}
                onBlur={onBlurHandler}
            />
            <button
                className="bg-red-400 w-0 group-hover:w-5 overflow-hidden transition-all"
                onClick={() => props.onDeleteClick(props.id)}
            >
                -
            </button>
        </div>
    );
}

export default ToDoItem;

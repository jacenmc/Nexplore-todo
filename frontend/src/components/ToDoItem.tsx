import { FocusEvent } from "react";

interface ToDoItemProps {
    id : string
    name : string
    onValueChange : (id:string, name:string) => void
}

function ToDoItem(props: ToDoItemProps) {
    let originalString = props.name;

    let onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        
        if( originalString != e.target.value) {
            props.onValueChange(props.id, e.target.value);
        }
    }

    return (
        <div>
            <input defaultValue={props.name} onBlur={onBlurHandler}/>
        </div>
    )
}

export default ToDoItem;
import { useEffect, useState } from "react";
import {
    createToDoItem,
    deleteToDoItem,
    getToDoList,
    toDoItemI,
    updateToDoItem,
} from "../apis/toDoApi";
import ToDoItem from "./ToDoItem";

function ToDoList() {
    const [toDoList, setToDoList] = useState<toDoItemI[]>([]);

    const fetchList = async () => {
        const data = await getToDoList();
        data.sort((a, b) => Number(a.id) - Number(b.id));
        setToDoList(data);
    };

    const updateItem = async (id: string, name: string) => {
        const data = await updateToDoItem(id, name);
        fetchList();
    };

    const addNewField = async () => {
        await createToDoItem("");
        fetchList();
    };

    const deleteItem = async (id: string) => {
        await deleteToDoItem(id);
        fetchList();
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="w-full max-w-[400px] p-4">
            {toDoList.map((e) => {
                return (
                    <ToDoItem
                        name={e.name}
                        id={e.id}
                        onValueChange={updateItem}
                        onDeleteClick={deleteItem}
                        key={e.id}
                    />
                );
            })}
            <button
                className="mt-3 border rounded border-slate-300 px-3 py-2 w-full"
                onClick={addNewField}
            >
                +
            </button>
        </div>
    );
}
export default ToDoList;

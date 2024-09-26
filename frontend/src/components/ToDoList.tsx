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
    const [loading, setLoading] = useState<boolean>(false);

    const fetchList = async (firstcall:boolean = true) => {
        if(firstcall){
            setLoading(true);
        }
        const data = await getToDoList();
        data.sort((a, b) => Number(a.id) - Number(b.id));
        setToDoList(data);
        if(firstcall){
            setLoading(false);
        }
    };

    const updateItem = async (id: string, name: string) => {
        setLoading(true);
        await updateToDoItem(id, name);
        await fetchList(false);
        setLoading(false);
    };

    const addNewField = async () => {
        setLoading(true);
        await createToDoItem("");
        await fetchList(false);
        setLoading(false);
    };

    const deleteItem = async (id: string) => {
        setLoading(true);
        await deleteToDoItem(id);
        await fetchList(false);
        setLoading(false);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className={`w-full max-w-[400px] p-4 ${loading ? "pointer-events-none opacity-20" : ""}`}>
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
                className="mt-3 mb-4 border rounded border-slate-300 px-3 py-2 w-full"
                onClick={addNewField}
            >
                +
            </button>
        </div>
    );
}
export default ToDoList;

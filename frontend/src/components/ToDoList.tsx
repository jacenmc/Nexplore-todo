import { useEffect, useState } from "react";
import { getToDoList, toDoItemI, updateToDoItem } from "../apis/toDoApi";
import ToDoItem from "./ToDoItem";

function ToDoList() {

    const [toDoList, setToDoList] = useState<toDoItemI[]>([]);

    const fetchList = async () => {
        const data = await getToDoList();
        setToDoList(data);
    }

    const updateItem = async (id:string, name:string) => {
        const data = await updateToDoItem(id, name);
        fetchList();
    }

    useEffect(()=>{
        fetchList();
    },[])

    

    return (
        <div>
            {
                toDoList.map((e)=>{
                    return <ToDoItem name={e.name} id={e.id} onValueChange={updateItem}/>
                })
            }
        </div>
    )
}
export default ToDoList;
const DOMAIN = "/todos";

export interface toDoItemI {
    "id" : string
    "name" : string
}

export async function getToDoList(): Promise<toDoItemI[]> {
    const url = `${DOMAIN}/`;
    const options = {
        method: "GET",
    };

    return await fetch(url, options)
        .then((res) => checkResponse(res).json())
        .catch((err) => handleError(err));
}

export async function createToDoItem(name:string): Promise<toDoItemI[]> {
    const url = `${DOMAIN}/`;
    const options = {
        method: "POST",
        body: JSON.stringify(
            {
                name: name
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await fetch(url, options)
        .then((res) => checkResponse(res).json())
        .catch((err) => handleError(err));
}

export async function updateToDoItem(id:string, name: string): Promise<toDoItemI[]> {
    const url = `${DOMAIN}/${id}`;
    const options = {
        method: "PUT",
        body: JSON.stringify(
            {
                name: name
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await fetch(url, options)
        .then((res) => checkResponse(res).json())
        .catch((err) => handleError(err));
}

export async function deleteToDoItem(id:string) {
    const url = `${DOMAIN}/${id}`;
    const options = {
        method: "DELETE",
    };

    return await fetch(url, options)
        .then((res) => checkResponse(res))
        .catch((err) => handleError(err));
}

function handleError(err : any) {
    alert("Something went wrong, please contact administrator. (console log)");
    console.error(err)
}
function checkResponse(res : Response) {
    if(!res.ok){
        alert(`${res.status} ${res.statusText} (console log)`)
        console.error(res)
    }
    return res;
}
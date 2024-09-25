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
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error("error:" + err));
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
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error("error:" + err));
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
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error("error:" + err));
}

export async function deleteToDoItem(id:string) {
    const url = `${DOMAIN}/${id}`;
    const options = {
        method: "DELETE",
    };

    return await fetch(url, options)
        .then((res) => res)
        .catch((err) => console.error("error:" + err));
}
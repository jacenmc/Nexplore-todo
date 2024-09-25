import ToDoList from "./components/ToDoList";

function App() {
    return (
        <div className="App flex flex-col items-center">
            <p className="text-xl text-center my-4 text-slate-500">TO DO</p>
            <ToDoList />
        </div>
    );
}

export default App;

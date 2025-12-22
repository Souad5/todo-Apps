import TaskForm from "./components/TaskForm";
import { TaskProvider } from "./contexts/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <TaskForm />
    </TaskProvider>
  );
}

export default App;

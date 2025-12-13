import Home from "./components/Form";
import Tasks from "./components/Tasks";
const firstName = "Souad";

function App() {
  return (
    <section className="bg-[#fbfaf9]">
      <Home />
      <Tasks name={firstName} />
    </section>
  );
}

export default App;

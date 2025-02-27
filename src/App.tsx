/*
 * File: App.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description:
 * App component where all components get called.
 */
import "./index.css";
import Category from "./components/Category";
import Header from "./components/Header";
import Difficulty from "./components/Difficulty";
function App() {
  return (
    <>
      <Header />
      <section className="flex flex-col">
        <Category />
        <Difficulty />
      </section>
    </>
  );
}

export default App;

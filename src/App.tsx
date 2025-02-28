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
import Type from "./components/Type";
import Submit from "./components/Submit";
import { useState } from "react";
import { ICategory } from "./api/apiCalls";

function App() {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState<ICategory | null>(null);
  const [type, setType] = useState("");

  /*
   * Function: handleDifficultyChange
   * Description: Handles the change in difficulty
   * Parameters:
   *   callbackDifficulty: string - Difficulty level of the trivia questions.
   */
  const handleDifficultyChange = (callbackDifficulty: string) => {
    setDifficulty(callbackDifficulty);
    console.log(callbackDifficulty);
  };

  /*
   * Function: handleCategoryChange
   * Description: Handles the change in category
   * Parameters:
   *   callbackCategory: ICategory - Category ID for the trivia questions.
   */
  const handleCategoryChange = (callbackCategory: ICategory | null) => {
    setCategory(callbackCategory);
    console.log(callbackCategory);
  };
  /*
   * Function: handleTypeChange
   * Description: Handles the change in type
   * Parameters:
   *   callbackType: string - type of questions
   */
  const handleTypeChange = (callbackType: string) => {
    setType(callbackType);
    console.log(callbackType);
  };

  return (
    <div className="h-full w-full">
      <div className="bg-card-background/30 m-10 mx-auto max-w-2xl rounded-2xl p-4 backdrop-blur-lg">
        <Header />
        <section className="container mx-auto flex max-w-lg flex-col px-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <Category handleCategoryChange={handleCategoryChange} />
          <Difficulty handleDifficultyChange={handleDifficultyChange} />
          <Type handleTypeChange={handleTypeChange} />
          <Submit category={category} difficulty={difficulty} type={type} />
        </section>
      </div>
    </div>
  );
}

export default App;

import "./index.css";
import Category from "./components/Category";
import Header from "./components/Header";
import Difficulty from "./components/Difficulty";
import Type from "./components/Type";
import Submit from "./components/Submit";
import Questions from "./components/Questions";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { getSessionToken, ICategory, TriviaQuestion } from "./api/apiCalls";

function App() {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState<ICategory | null>(null);
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const newToken = await getSessionToken();
      console.log("Fetched Token:", newToken);
      setToken(newToken);
    };
    fetchToken();
  }, []);

  const handleDifficultyChange = (callbackDifficulty: string) => {
    setDifficulty(callbackDifficulty);
    console.log(callbackDifficulty);
  };

  const handleCategoryChange = (callbackCategory: ICategory | null) => {
    setCategory(callbackCategory);
    console.log(callbackCategory);
  };

  const handleTypeChange = (callbackType: string) => {
    setType(callbackType);
    console.log(callbackType);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-card-background/30 mx-auto my-10 w-full max-w-screen-lg flex-1 rounded-2xl p-2 backdrop-blur-xl sm:max-w-screen-md md:max-w-2xl">
        <Header />
        <section className="container mx-auto flex flex-col px-4">
          {questions.length > 0 && (
            <Questions
              questions={questions}
              setQuestions={setQuestions}
              token={token}
              category={category}
              difficulty={difficulty}
              type={type}
            />
          )}

          <Category handleCategoryChange={handleCategoryChange} />
          <Difficulty handleDifficultyChange={handleDifficultyChange} />
          <Type handleTypeChange={handleTypeChange} />
          <Submit
            category={category}
            difficulty={difficulty}
            type={type}
            setQuestions={setQuestions}
            token={token}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;

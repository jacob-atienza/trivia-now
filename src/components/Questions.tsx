import React, { useState, useMemo } from "react";
import { getTriviaQuestions, TriviaQuestion, ICategory } from "../api/apiCalls";

interface QuestionsProps {
  questions: TriviaQuestion[];
  setQuestions: (newQuestions: TriviaQuestion[]) => void;
  token: string;
  category?: ICategory | null;
  difficulty?: string;
  type?: string;
}

const Questions: React.FC<QuestionsProps> = ({
  questions,
  setQuestions,
  token,
  category,
  difficulty,
  type,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = questions[currentQuestionIndex];

  const decodeHtmlEntities = (text: string) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent || text;
  };

  const shuffledOptions = useMemo(() => {
    const allOptions = [...question.incorrect_answers, question.correct_answer];
    return allOptions.sort(() => Math.random() - 0.5);
  }, [question]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex === 9) {
      // Fetch new questions using previous parameters
      const newQuestions = await getTriviaQuestions(
        token,
        category?.id,
        difficulty,
        type,
      );
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="container mx-auto max-w-lg rounded-lg bg-white/10 p-6 shadow-xl backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">
        {decodeHtmlEntities(question.question)}
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            value={option}
            aria-pressed={selectedAnswer === option}
            className={`rounded-md p-3 text-lg transition ${
              selectedAnswer
                ? option === question.correct_answer
                  ? "bg-green-500/70 text-white"
                  : "bg-red-500/70 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
          >
            {decodeHtmlEntities(option)}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleNextQuestion}
          className="rounded-lg bg-yellow-500 px-6 py-2 text-lg font-bold text-white transition hover:bg-yellow-600 disabled:opacity-50"
          disabled={!isAnswered}
        >
          {currentQuestionIndex === 9 ? "Get More Questions" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Questions;

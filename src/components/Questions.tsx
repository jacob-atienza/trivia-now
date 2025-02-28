import React, { useState } from "react";
import { TriviaQuestion } from "../api/apiCalls";

interface QuestionsProps {
  questions: TriviaQuestion[];
}

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions[currentQuestionIndex];

  // Helper function to decode HTML
  const decodeHtmlEntities = (text: string) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent || text;
  };

  // Ensure the options are randomized for multiple-choice
  const options = [...question.incorrect_answers, question.correct_answer];
  options.sort(() => Math.random() - 0.5);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setIsCorrect(answer === question.correct_answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {question && (
        <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
            {decodeHtmlEntities(question.question)} {/* Decode question here */}
          </h2>

          {/* Render different options based on the question type */}
          <div className="space-y-4">
            {question.type === "multiple" && (
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="question-option"
                      value={option}
                      className="h-5 w-5 text-yellow-400"
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                      disabled={isAnswered} // Disable options after answering
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className={`text-gray-700 ${isAnswered && option === question.correct_answer ? "text-green-500" : ""}`}
                    >
                      {decodeHtmlEntities(option)} {/* Decode option text */}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "boolean" && (
              <div className="space-x-4">
                <div className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    id="true-option"
                    name="question-option"
                    value="True"
                    className="h-5 w-5 text-yellow-400"
                    checked={selectedAnswer === "True"}
                    onChange={() => handleAnswerSelect("True")}
                    disabled={isAnswered} // Disable options after answering
                  />
                  <label htmlFor="true-option" className="text-gray-700">
                    True
                  </label>
                </div>
                <div className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    id="false-option"
                    name="question-option"
                    value="False"
                    className="h-5 w-5 text-yellow-400"
                    checked={selectedAnswer === "False"}
                    onChange={() => handleAnswerSelect("False")}
                    disabled={isAnswered} // Disable options after answering
                  />
                  <label htmlFor="false-option" className="text-gray-700">
                    False
                  </label>
                </div>
              </div>
            )}

            {isAnswered && (
              <div className="mt-4">
                <p
                  className={`text-xl font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}
                >
                  {isCorrect ? "Correct!" : "Wrong!"}
                </p>
                {!isCorrect && (
                  <p className="mt-2 text-lg text-gray-700">
                    The correct answer was:{" "}
                    {decodeHtmlEntities(question.correct_answer)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleNextQuestion}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-white transition duration-200 hover:bg-yellow-500"
              disabled={!isAnswered} // Disable Next Question button until answered
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;

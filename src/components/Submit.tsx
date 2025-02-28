/*
 *   File: Submit.tsx
 *   Programmer: Jacob Atienza
 *   Date: 02/28/2025
 *   Description:
 *   This function contains the logic for submitting the query to get trivia questions.
 *   It also performs a  GET request from the trivia API.
 */

import {
  getTriviaQuestions,
  getSessionToken,
  ICategory,
  TriviaQuestion,
} from "../api/apiCalls";
import { useState } from "react";

interface SubmitProps {
  category?: ICategory | null;
  difficulty?: string;
  type?: string;
  setQuestions: (questions: TriviaQuestion[]) => void;
}
/*
 * Component: Submit
 * Description: Handles Submission logic and displays a button on the configurations card.
 */
const Submit: React.FC<SubmitProps> = ({
  category,
  difficulty,
  type,
  setQuestions,
}) => {
  const [token, setToken] = useState("");
  /*
   * Function: handleSubmit
   * Description: Checks if a token has been created for the user.
   * If it hasn't, it creates one and holds it in the token state.
   */
  const handleSubmit = async () => {
    let newToken = token;
    if (!newToken) {
      newToken = await getSessionToken();
      setToken(newToken);
    }

    const params: {
      token: string;
      category?: number;
      difficulty?: string;
      type?: string;
    } = { token: newToken };

    if (category) {
      params.category = category.id;
    }

    if (difficulty) {
      params.difficulty = difficulty;
    }

    if (type) {
      params.type = type;
    }

    const fetchedQuestions = await getTriviaQuestions(
      newToken,
      category?.id,
      difficulty,
      type,
    );

    console.log(fetchedQuestions);
    setQuestions(fetchedQuestions);
  };

  return (
    <button
      className="bg-btn/80 hover:not-focus:bg-btn text-btn-text not-focus: focus:border-border my-4 rounded-xl border-2 border-transparent p-2 text-2xl sm:text-3xl"
      type="button"
      onClick={(e) => {
        handleSubmit();
        (e.target as HTMLButtonElement).blur();
      }}
    >
      Get Question
    </button>
  );
};

export default Submit;

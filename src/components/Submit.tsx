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
} from "../api/apiCalls";
import { useState } from "react";

interface SubmitProps {
  category?: ICategory | null;
  difficulty?: string;
  type?: string;
}
/*
 * Component: Submit
 * Description: Handles Submission logic and displays a button on the configurations card.
 */
const Submit: React.FC<SubmitProps> = ({ category, difficulty, type }) => {
  const [token, setToken] = useState("");
  /*
   * Function: handleSubmit
   * Description: Checks if a token has been created for the user.
   * If it hasn't, it creates one and holds it in the token state.
   */
  const handleSubmit = async () => {
    console.log("I have been clicked");
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
      console.log("Category:", category);
      params.category = category.id;
    }

    if (difficulty) {
      console.log("Difficulty:", difficulty);
      params.difficulty = difficulty;
    }
    console.log(type);
    if (type) {
      console.log("Type:", type);
      params.type = type;
    }

    const queryString = new URLSearchParams(params as any).toString();
    console.log("Final Params:", params);
    console.log("Query String:", queryString);
    //await getTriviaQuestions(queryString);
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

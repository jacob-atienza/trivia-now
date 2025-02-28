/*
 *   File: apiCalls.ts
 *   Programmer: Jacob Atienza
 *   Date: 02/27/2025
 *   Description:
 *   This file contains the API calls to fetch trivia questions from the Open Trivia Database.
 *   The API calls are made using the axiosInstance, which is a pre-configured Axios instance.
 *   The getSessionToken function requests a session token from the API.
 *   The fetchTriviaQuestions function fetches trivia questions from the API using the session token.
 */

import axiosInstance from "./axiosInstance";

export interface TriviaQuestion {
  question: string;
  correctAnswer: string;
  incorrectAnswer: string[];
}

export interface ICategory {
  id: number;
  name: string;
}

/*
 * Function: getSessionToken
 * Description: Requests a session token from the Open Trivia Database API.
 * Returns: A promise that resolves to a session token string.
 */
export const getSessionToken = async (): Promise<string> => {
  console.log("I made it to the get sesh");
  try {
    const response = await axiosInstance.get("api_token.php?command=request");
    return response.data.token;
  } catch (error) {
    console.error("Error requesting session token:", error);
    throw error;
  }
};

/*
 * Function: fetchCategories
 * Description: Fetches trivia categories from the Open Trivia Database API.
 * Returns: A promise that resolves to an array of trivia categories.
 */
export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axiosInstance.get("api_category.php");
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/*
 * Function: getTriviaQuestions
 * Description: Gets trivia questions from the Open Trivia Database API using the session token.
 * Parameters:
 *   token: string - Session token for tracking.
 *   catagoryId?: number - Category ID for the trivia questions.
 *   difficulty?: string - Difficulty level of the trivia questions.
 *   type?: string - Type of the trivia questions (multiple or boolean).
 * Returns: A promise that resolves to an array of trivia questions.
 */
export const getTriviaQuestions = async (
  token: string,
  catagoryId?: number,
  difficulty?: string,
  type?: string,
): Promise<TriviaQuestion[]> => {
  try {
    const params: any = {
      token,
    };
    if (catagoryId) {
      params.category = "&category=" + catagoryId;
    }
    if (difficulty) {
      params.difficulty = "&difficulty=" + difficulty;
    }
    if (type) {
      params.type = "&type=" + type;
    }

    const response = await axiosInstance.get("api.php?amount=10", {
      params,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    throw error;
  }
};

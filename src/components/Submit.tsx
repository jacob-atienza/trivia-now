/*
 * File: Submit.tsx
 * Programmer: Jacob Atienza
 * Date: 02/28/2025
 * Description:
 * This function contains the logic for submitting the query to get trivia questions.
 * It also performs a GET request from the trivia API.
 */
import { getTriviaQuestions, ICategory, TriviaQuestion } from "../api/apiCalls";

/*
 * Interface: SubmitProps
 * Description: Props interface for the Submit component. Contains category, difficulty, type,
 * and a function to set the questions in the parent component, along with the token.
 */
export interface SubmitProps {
  category?: ICategory | null;
  difficulty?: string;
  type?: string;
  setQuestions: (questions: TriviaQuestion[]) => void;
  token: string; // Receive token as a prop
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
  token,
}) => {
  /*
   * Function: handleSubmit
   * Description: Submits the query to the trivia API with the provided parameters,
   * and sets the fetched questions in the parent component.
   */
  const handleSubmit = async () => {
    if (!token) {
      console.error("Token is missing!");
      return; // Ensure token is available before making API request
    }

    console.log("Submitting with token:", token); // Debugging the token before fetch

    const fetchedQuestions = await getTriviaQuestions(
      token,
      category?.id,
      difficulty,
      type,
    );

    console.log("Fetched Questions:", fetchedQuestions);

    if (fetchedQuestions && fetchedQuestions.length > 0) {
      setQuestions(fetchedQuestions);
    } else {
      console.error("No questions were fetched or invalid response");
    }
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

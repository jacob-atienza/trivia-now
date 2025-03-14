/* eslint-disable react/react-in-jsx-scope */
/*
 * File: Difficulty.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description: This file has the Tabgroup containing the difficulty selection
 */
interface DifficultyProps {
  handleDifficultyChange: (callbackDifficulty: string) => void;
}
/*
 * Function: Difficulty
 * Description: This function returns the difficulty selection tab group
 */
const Difficulty: React.FC<DifficultyProps> = ({ handleDifficultyChange }) => {
  const difficulties = ["Any Difficulty", "Easy", "Medium", "Hard"];

  /*
   * Function handleChange
   * Description: Event handler for setting the difficulty
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleDifficultyChange(event.target.value.toLowerCase());
  };

  return (
    <>
      <label className="text-card-paragraph py-2 text-lg font-semibold sm:text-xl md:text-2xl">
        Difficulty
      </label>
      <select
        name="difficulty"
        className="text-paragraph bg-btn-text md:text-md border-border rounded-md border p-2 text-xs sm:text-sm lg:text-lg xl:text-xl"
        aria-label="difficulty"
        onChange={handleChange}
      >
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </>
  );
};

export default Difficulty;

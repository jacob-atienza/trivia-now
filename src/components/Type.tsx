/*
 * File: Type.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description: This file has the Tabgroup containing the type selection
 */
interface TypeProps {
  handleTypeChange: (callbackType: string) => void;
}
/*
 * Function: Type
 * Description: This function returns the type selection tab group
 */
const Type: React.FC<TypeProps> = ({ handleTypeChange }) => {
  const types = [
    {
      key: "Any Type",
      value: "",
    },
    {
      key: "Multiple Choice",
      value: "multiple",
    },
    {
      key: "True / False",
      value: "boolean",
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleTypeChange(event.target.value);
  };

  return (
    <>
      <label className="text-card-paragraph py-2 text-lg font-semibold sm:text-xl md:text-2xl">
        Type
      </label>
      <select
        name="type"
        className="text-paragraph bg-btn-text md:text-md border-border rounded-md border p-2 text-xs sm:text-sm lg:text-lg xl:text-xl"
        aria-label="type"
        onChange={handleChange}
      >
        {types.map((type) => {
          return (
            <option value={type.value} key={type.key}>
              {type.key}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Type;

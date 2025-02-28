/*
 * File: Category.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description: Contains the Category component for the trivia app.
 */
import { fetchCategories, ICategory } from "../api/apiCalls";
import { useState, useEffect } from "react";

interface CategoryProps {
  handleCategoryChange: (category: ICategory | null) => void;
}
/*
 * Function: Category
 * Description: This function returns the category selection dropdown
 */
const Category: React.FC<CategoryProps> = ({ handleCategoryChange }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId === "any") {
      handleCategoryChange(null);
    } else {
      const selectedCategory = categories.find(
        (cat) => cat.id.toString() === selectedId,
      );
      if (selectedCategory) {
        handleCategoryChange(selectedCategory);
      }
    }
  };

  return (
    <>
      <label className="text-card-paragraph py-2 text-lg font-semibold sm:text-xl md:text-2xl">
        Category
      </label>
      <select
        name="category"
        className="text-paragraph bg-btn-text md:text-md border-border rounded-md border p-2 text-xs sm:text-sm lg:text-lg xl:text-xl"
        aria-label="Category"
        onChange={handleChange}
      >
        <option value="any">Any Category</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        )}
      </select>
    </>
  );
};

export default Category;

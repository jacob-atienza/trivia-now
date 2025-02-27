/*
 * File: Category.tsx
 * Programmer: Jacob Atienza
 * Date: 2/27/2025
 * Description: Contains the Category component for the trivia app.
 */
import { Select } from "@headlessui/react";
import { fetchCategories, ICategory } from "../api/apiCalls";
import { useState, useEffect } from "react";
/*
 * Function: Category
 * Description: This function returns the category selection dropdown
 */
const Category = () => {
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
  return (
    <section className="flex flex-col items-center justify-center">
      <label className="text-headline mb-3 text-lg font-semibold sm:text-xl md:text-2xl">
        Category
      </label>
      <Select
        name="category"
        className="text-paragraph bg-btn-text border-btn md:text-md mx-auto rounded-md border p-2 text-xs sm:text-sm lg:text-lg xl:text-xl"
        aria-label="Category"
      >
        <option value="">Any Category</option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        )}
      </Select>
    </section>
  );
};

export default Category;

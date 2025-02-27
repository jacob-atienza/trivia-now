import { Select } from "@headlessui/react";
import { fetchCategories, Category } from "../api/apiCalls";
import { useState, useEffect } from "react";

const Options = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
    <section className="flex h-screen flex-col items-center justify-center">
      <Select
        name="category"
        className="sm:text-md mx-auto rounded-md border p-2 text-sm md:text-lg lg:text-xl xl:text-2xl"
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

export default Options;

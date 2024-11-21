import { columnsCategory } from "@/components/pages/dashboard/category/column-category";
import DialogAddCategory from "@/components/pages/dashboard/category/DialogAddCategory";
import { DataTable } from "@/components/pages/dashboard/product/data-table";
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/useProductsStore";
import { calculateCategoryTotals } from "@/utils/util";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const [calculateCategories, setCalculateCategories] = useState([]);

  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCalculateCategories(calculateCategoryTotals(products, categories));
  }, [categories, products]);

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Category Produk</h1>
        <DialogAddCategory fetchCategories={fetchCategories} />
      </div>

      <DataTable
        columns={columnsCategory}
        data={calculateCategories.reverse()}
      />
    </div>
  );
};

export default CategoryPage;

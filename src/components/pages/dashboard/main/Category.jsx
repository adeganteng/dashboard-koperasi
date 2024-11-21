import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/useProductsStore";
import { calculateCategoryTotals } from "@/utils/util";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();
  const [calculateCategories, setCalculateCategories] = useState([]);

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
    <div className="bg-secondary p-4 rounded-xl w-full flex flex-col">
      <h1 className="text-xl font-semibold">Kategory</h1>
      <Table className="">
        <TableCaption>
          <Link to={"/dashboard/category"} className="underline text-primary">
            Show All category
          </Link>
        </TableCaption>
        <TableHeader>
          <TableRow className="border-secondary-foreground">
            <TableHead>Name</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculateCategories.slice(0, 3).map((item, index) => (
            <TableRow key={index} className="border-secondary-foreground">
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Category;

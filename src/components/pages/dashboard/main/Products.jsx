import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductStore } from "@/store/useProductsStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="bg-secondary p-4 rounded-xl w-full flex flex-col">
      <h1 className="text-2xl font-semibold">Products</h1>
      <Table className="">
        <TableCaption>
          <Link to={"/dashboard/products"} className="underline text-primary">
            Show All Products
          </Link>
        </TableCaption>
        <TableHeader>
          <TableRow className="border-secondary-foreground">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="max-sm:hidden">Kategory</TableHead>
            <TableHead className="max-sm:hidden">Qty</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.slice(0, 5).map((item, index) => (
            <TableRow key={index} className="border-secondary-foreground">
              <TableCell>
                <img src={item.image} className="w-[50px] h-[50px]" alt="" />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="max-sm:hidden">{item.category}</TableCell>
              <TableCell className="max-sm:hidden">{item.qty}</TableCell>
              <TableCell>
                {item.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0, // Opsional, untuk menghilangkan angka desimal
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;

import { columns } from "@/components/pages/dashboard/product/columns";
import { DataTable } from "@/components/pages/dashboard/product/data-table";
import SheetAddProduct from "@/components/pages/dashboard/product/SheetAddProduct";
import { useProductStore } from "@/store/useProductsStore";
import { useEffect } from "react";

const ProductPage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Daftar Produk</h1>
        <SheetAddProduct />
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductPage;

import { Button } from "@/components/ui/button";
import { formattedToRupiah } from "@/utils/util";
import { ArrowUpDown } from "lucide-react";

import ButtonActions from "./ButtonActions";

export const columns = [
  {
    accessorKey: "image",
    header: () => {
      return <span className="max-sm:hidden">Gambar</span>;
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <img src={product.image} className="w-[80px] max-sm:hidden" alt="" />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"max-sm:hidden"}
        >
          Kategory
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase max-sm:hidden">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "qty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={"max-sm:hidden"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kuantiti
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase max-sm:hidden">{row.getValue("qty")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={"max-sm:hidden"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className={"max-sm:hidden"}>
        {formattedToRupiah(row.getValue("price"))}
      </div>
    ),
  },
  {
    id: "actons",
    cell: ({ row }) => {
      return (
        <>
          <ButtonActions row={row} />
        </>
      );
    },
  },
];

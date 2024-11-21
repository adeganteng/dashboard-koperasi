import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import ButtonActionsCategory from "./ButtonActionsCategory";

export const columnsCategory = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Kategori
          <ArrowUpDown />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="lowercase px-6">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"text-left"}
        >
          Total Barang
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center sm:text-left px-6">
        {row.getValue("total")}
      </div>
    ),
  },
  {
    id: "actons",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <>
          <ButtonActionsCategory category={category} />
        </>
      );
    },
  },
];

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, Edit, Ellipsis, Info, Trash } from "lucide-react";
import { useState } from "react";
import DetailProduct from "./DetailProduct";
import SheetEditProduct from "./SheetEditProduct";
import DialogIn from "./DialogIn";
import DialogOut from "./DialogOut";
import DialogDelete from "./DialogDelete";

const ButtonActions = ({ row }) => {
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [isOpenSheetEdit, setIsOpenSheetEdit] = useState(false);
  const [isOpenDialogIn, setIsOpenDialogIn] = useState(false);
  const [isOpenDialogOut, setIsOpenDialogOut] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  const produk = row.original;

  const handleDialogOpen = () => setDetailDialogOpen(true);
  const handleDialogClose = () => setDetailDialogOpen(false);

  const handleSheetOpen = () => setIsOpenSheetEdit(true);

  const handleDialogInOpen = () => setIsOpenDialogIn(true);
  const handleDialogInClose = () => setIsOpenDialogIn(false);

  const handleDialogOutOpen = () => setIsOpenDialogOut(true);
  const handleDialogOutClose = () => setIsOpenDialogOut(false);

  const handleDialogDeleteOpen = () => setIsOpenDialogDelete(true);
  const handleDialogDeleteClose = () => setIsOpenDialogDelete(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Ellipsis size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer text-primary"
            onClick={handleDialogOpen}
          >
            <Info size={16} />
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-green-500"
            onClick={handleSheetOpen}
          >
            <Edit size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDialogDeleteOpen}
            className="cursor-pointer text-red-500"
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDialogInOpen}
            className="cursor-pointer text-indigo-500"
          >
            <ArrowUp size={16} />
            In
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDialogOutOpen}
            className="cursor-pointer text-orange-500"
          >
            <ArrowDown size={16} />
            Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DetailProduct
        product={produk}
        isDetailDialogOpen={isDetailDialogOpen}
        setDetailDialogOpen={setDetailDialogOpen}
        handleDialogClose={handleDialogClose}
      />

      <SheetEditProduct
        product={produk}
        sheetOpen={isOpenSheetEdit}
        setSheetOpen={setIsOpenSheetEdit}
      />

      <DialogIn
        product={produk}
        open={isOpenDialogIn}
        setOpen={setIsOpenDialogIn}
        handleDialogClose={handleDialogInClose}
      />

      <DialogOut
        product={produk}
        open={isOpenDialogOut}
        setOpen={setIsOpenDialogOut}
        handleDialogClose={handleDialogOutClose}
      />

      <DialogDelete
        product={produk}
        open={isOpenDialogDelete}
        setOpen={setIsOpenDialogDelete}
        handleDialogClose={handleDialogDeleteClose}
      />
    </>
  );
};

export default ButtonActions;

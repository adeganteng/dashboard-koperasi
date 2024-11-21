import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import DialogEditCategory from "./DialogEditCategory";
import DialogDeleteCategory from "./DialogDeleteCategory";

const ButtonActionsCategory = ({ category }) => {
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  const handleDialogEditOpen = () => setIsOpenDialogEdit(true);
  const handleDialogEditClose = () => setIsOpenDialogEdit(false);

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
            onClick={handleDialogEditOpen}
            className="cursor-pointer text-green-500"
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
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogEditCategory
        category={category}
        open={isOpenDialogEdit}
        setOpen={setIsOpenDialogEdit}
        handleCloseDialog={handleDialogEditClose}
      />

      <DialogDeleteCategory
        category={category}
        open={isOpenDialogDelete}
        setOpen={setIsOpenDialogDelete}
        handleDialogClose={handleDialogDeleteClose}
      />
    </>
  );
};

export default ButtonActionsCategory;

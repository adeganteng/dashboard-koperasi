import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formattedToRupiah } from "@/utils/util";

const DetailProduct = ({
  product,
  isDetailDialogOpen,
  setDetailDialogOpen,
  handleDialogClose,
}) => {
  return (
    <Dialog open={isDetailDialogOpen} onOpenChange={setDetailDialogOpen}>
      <DialogContent className="w-[95%] rounded-lg sm:w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Produk {product?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full  flex gap-5 items-center">
          <div>
            <img src={product?.image} alt="" className="w-52" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-base font-semibold">
              <span className="font-normal">Nama:</span>
              <span className="">{product?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-base font-semibold">
              <span className="font-normal">Kategori:</span>
              <span className="">{product?.category}</span>
            </div>
            <div className="flex items-center gap-2 text-base font-semibold">
              <span className="font-normal">Harga:</span>
              <span className="">{formattedToRupiah(product?.price)}</span>
            </div>
            <span className="font-normal">{product?.description}</span>
          </div>
        </div>
        <div className="w-full flex justify-end mt-6">
          <Button onClick={handleDialogClose} variant="outline">
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailProduct;

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const DialogContentComponent = ({
  title,
  description,
  size,
  buttonText,
  handleClick,
}: any) => {
  return (
    <DialogContent
      className={`sm:max-w-[425px] lg:max-w-${size} bg-white text-black`}
    >
      <DialogHeader>
        <DialogTitle className="text-lg text-[#4B6BFB] font-semibold mb-2">
          {title}
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-end">
        {/* <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="inline-flex justify-center rounded-xl border border-transparent 
              bg-[#4B6BFB] py-2 px-4 text-sm font-medium text-white shadow-sm 
              hover:bg-[#3B49C0] focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]
              focus:ring-offset-2 dark:bg-[#4B6BFB] dark:hover:bg-[#3B49C0] dark:focus:ring-[#4B6BFB]"
          >
            Close
          </Button>
        </DialogClose> */}
        <Button
          type="button"
          variant="outline"
          className="inline-flex justify-center rounded-xl border border-transparent 
              bg-[#4B6BFB] py-2 px-4 text-sm font-medium text-white shadow-sm 
              hover:bg-[#3B49C0] focus:outline-none focus:ring-2 focus:ring-[#4B6BFB]
              focus:ring-offset-2 dark:bg-[#4B6BFB] dark:hover:bg-[#3B49C0] dark:focus:ring-[#4B6BFB]"
          onClick={() => {
            handleClick();
          }}
        >
          {buttonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogContentComponent;

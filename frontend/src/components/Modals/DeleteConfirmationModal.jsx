import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "@/redux/slices/ModalsToggleSlice";
const DeleteConfirmationModal = () => {
  const isOpen = useSelector(
    (state) => state.ModalToggle.deleteConfirmationModal
  );
  const dispatch = useDispatch();
  return (
    <AlertDialog
      open={isOpen}
      onClose={() => dispatch(openModal("deleteConfirmationModal"))}
    >
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => dispatch(closeModal("deleteConfirmationModal"))}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => dispatch(closeModal("deleteConfirmationModal"))}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;

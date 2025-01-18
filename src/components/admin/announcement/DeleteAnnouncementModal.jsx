import { FaTrash } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function DeleteAnnouncementModal({ id, getAnnouncements, setOpenDeleteAlert }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDeleteAnnouncement = async (e) => {
    e.preventDefault();
    handleOpen();
    try {
      const response = await axios.delete(`${PORT}/announcements/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOpenDeleteAlert(true);
      getAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button size="sm" color="red" onClick={handleOpen}>
        <FaTrash />
      </Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Delete Announcement</p>
        </DialogHeader>
        <DialogBody className="px-5">
          <Typography variant="h4">
            Are you sure you want to delete this announcement?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="purple"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="deep-purple"
            onClick={handleDeleteAnnouncement}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteAnnouncementModal;

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

function DeleteStudentModal({ id, getStudent, setOpenDeleteAlert }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDeleteStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${PORT}/students/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleOpen();
      setOpenDeleteAlert(true);
      getStudent();
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
          <p className="text-purple-800">Delete Student</p>
        </DialogHeader>
        <DialogBody className="px-5">
          <Typography variant="h4">
            Are you sure you want to delete this student?
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
            onClick={handleDeleteStudent}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteStudentModal;

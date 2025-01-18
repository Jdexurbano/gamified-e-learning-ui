import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import { useState } from "react";

function AddAnnouncementModal({
  open,
  handleOpen,
  getAnnouncements,
  setOpenAlert,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const clearFields = () => {
    setTitle("");
    setDescription("");
  };

  const AddAnnouncement = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.post(`${PORT}/announcements`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getAnnouncements();
      setOpenAlert();
      clearFields();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Add Announcement</p>
        </DialogHeader>
        <DialogBody>
          <form
            id="addAnnouncement"
            onSubmit={AddAnnouncement}
            className="flex flex-col gap-2"
          >
            <div>
              <Input
                label="Title"
                color="purple"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
            </div>

            <div>
              <Textarea
                label="Description"
                color="purple"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={handleOpen}
            variant="text"
            color="purple"
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="deep-purple"
            form="addAnnouncement"
            onClick={handleOpen}
            type="submit"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddAnnouncementModal;

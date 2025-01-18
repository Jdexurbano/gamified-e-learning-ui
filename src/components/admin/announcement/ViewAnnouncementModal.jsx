import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
function ViewAnnouncementModal({
  data,
  id,
  getAnnouncements,
  setOpenUpdateAlert,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const updateAnnouncement = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.put(`${PORT}/announcements/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getAnnouncements();
      setOpenUpdateAlert(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button size="sm" color="deep-purple" onClick={handleOpen}>
        <FaPenToSquare size={12} />
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Update Announcement</p>
        </DialogHeader>
        <DialogBody>
          <form
            id="updateAnnouncement"
            onSubmit={updateAnnouncement}
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
            form="updateAnnouncement"
            type="submit"
            onClick={handleOpen}
          >
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ViewAnnouncementModal;

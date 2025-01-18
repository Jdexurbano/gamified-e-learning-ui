import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

function StudentAnnouncementModal({ open, handleOpen, titlesAndDescriptions }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Announcement</p>
        </DialogHeader>
        <DialogBody>
          <form
            id="updateAnnouncement"
            // onSubmit={updateAnnouncement}
            className="flex flex-col gap-2"
          >
            <div>
              <Input
                label="Title"
                color="purple"
                value={titlesAndDescriptions.title}
                // onChange={(e) => setTitle(e.target.value)}
              ></Input>
            </div>

            <div>
              <Textarea
                label="Description"
                color="purple"
                value={titlesAndDescriptions.description}
                // onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="purple"
            className="mr-1"
            onClick={handleOpen}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default StudentAnnouncementModal;

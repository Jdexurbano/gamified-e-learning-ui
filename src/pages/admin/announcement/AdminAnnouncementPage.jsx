import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa6";
import AddAnnouncementModal from "../../../components/admin/announcement/AddAnnouncementModal";
import ViewAnnouncementModal from "../../../components/admin/announcement/ViewAnnouncementModal";
import DeleteAnnouncementModal from "../../../components/admin/announcement/DeleteAnnouncementModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import { convertISODate } from "../../../utils/convert-ISO-date";
function AdminAnnouncementPage() {
  const TABLE_HEAD = ["Title", "Description", "Date", ""];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [announcements, setAnnouncements] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const getAnnouncements = async () => {
    try {
      const response = await axios.get(`${PORT}/announcements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);
  return (
    <>
      <main className="px-6 pt-8 ">
        <Button
          variant="filled"
          size="sm"
          className="flex items-center gap-2 rounded-md bg-purple-300 mb-2"
          onClick={handleOpen}
        >
          <FaClipboardList size={20} />
          Add Announcement
        </Button>
        <Card className=" w-full overflow-y-auto max-h-[30rem]">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-purple-200 p-4"
                  >
                    <Typography
                      variant="small"
                      className="font-extrabold text-white leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {announcements.map((data, index) => (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 even:border-2"
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.title}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {convertISODate(data.created_at)}
                    </Typography>
                  </td>

                  <td className=" p-2 flex gap-4">
                    <ViewAnnouncementModal
                      data={data}
                      getAnnouncements={getAnnouncements}
                      id={data.id}
                      setOpenUpdateAlert={setOpenUpdateAlert}
                    />
                    <DeleteAnnouncementModal
                      id={data.id}
                      getAnnouncements={getAnnouncements}
                      setOpenDeleteAlert={setOpenDeleteAlert}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <AddAnnouncementModal
          open={open}
          handleOpen={handleOpen}
          getAnnouncements={getAnnouncements}
          setOpenAlert={setOpenAlert}
        />

        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Announcemet has been added successfully!
        </Alert>

        <Alert
          open={openUpdateAlert}
          onClose={() => setOpenUpdateAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Updates were successful!
        </Alert>

        <Alert
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          color="red"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Announcement has been deleted successfully!
        </Alert>
      </main>
    </>
  );
}

export default AdminAnnouncementPage;

import { useState, useEffect } from "react";
import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import { convertISODate } from "../../../utils/convert-ISO-date";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import StudentAnnouncementModal from "../../../components/student/announcement/StudentAnnouncementModal";
function AnnouncementPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setOpen(!open);
  };
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const TABLE_HEAD = ["Title", "Description", "Date"];

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
    <main className="w-full flex justify-center items-center">
      <Card className=" w-[70rem] overflow-y-auto max-h-[30rem] mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-purple-200 p-4 text-center"
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
            {announcements.map((data, index) => {
              return (
                <tr
                  onClick={() => handleOpen(data)}
                  key={index}
                  className="even:bg-blue-gray-50/50 even:border-2 hover:bg-purple-50 text-center cursor-pointer"
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <StudentAnnouncementModal
        open={open}
        handleOpen={handleOpen}
        title={title}
        description={description}
      />
    </main>
  );
}

export default AnnouncementPage;

import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

function ViewStudentModal({ data, getStudent, id, setOpenUpdateAlert }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [middleInitial, setMiddleInitial] = useState(data.middle_initial);
  const [studentNumber, setStudentNumber] = useState(data.student_No);
  const [age, setAge] = useState(data.age);
  const [address, setAddress] = useState(data.address);
  const [username, setUsername] = useState(data.username);

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      age: age,
      student_No: studentNumber,
      address: address,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.put(`${PORT}/students/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getStudent();
      handleOpen();
      setOpenUpdateAlert(true);
    } catch (error) {}
  };
  return (
    <>
      <Button size="sm" color="deep-purple" onClick={handleOpen}>
        <FaPenToSquare size={12} />
      </Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Update Student</p>
        </DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleUpdateStudent}
            id="updateStudent"
            className="flex flex-col gap-2"
          >
            <div>
              <Input
                required
                label="First Name"
                color="purple"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Last Name"
                color="purple"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Middle Name"
                color="purple"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Student Number"
                color="purple"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Age"
                color="purple"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Address"
                color="purple"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Username"
                color="purple"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </form>
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
            form="updateStudent"
            type="submit"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ViewStudentModal;

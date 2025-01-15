import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function AddStudentModal({ open, handleOpen, getStudent, setOpenAlert }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setMiddleInitial("");
    setStudentNumber("");
    setAge("");
    setAddress("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      student_No: studentNumber,
      age: age,
      address: address,
      role: "student",
      username: username,
      password: password,
      password_confirmation: confirmPassword,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.post(`${PORT}/register`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getStudent();
      handleOpen();
      setOpenAlert(true);
      clearFields();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <p className="text-purple-800">Add Student</p>
        </DialogHeader>
        <DialogBody>
          <form
            id="addStudent"
            onSubmit={handleSubmit}
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
            <div>
              <Input
                required
                label="Password"
                color="purple"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Input
                required
                label="Confirm password"
                color={`${
                  confirmPassword
                    ? confirmPassword != password
                      ? "red"
                      : "green"
                    : "purple"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            form="addStudent"
            type="submit"
            disabled={password === confirmPassword ? false : true}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddStudentModal;

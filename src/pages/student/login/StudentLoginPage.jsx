import { FaUser, FaLock } from "react-icons/fa6";
import { Input, Button, Alert } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function StudentLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigateToAdmin = () => navigate("/admin");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.post(`${PORT}/student`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error.message);
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[75vh] flex flex-col justify-center items-center gap-4 bg-gray-50 mt-14 px-5 pt-8 pb-12 rounded-lg">
        <h1 className="font-semibold text-3xl text-purple-400">Student</h1>
        <form
          onSubmit={handleLogin}
          className="w-[60vh] flex flex-col items-center gap-2"
        >
          <div className="w-[60vh] ">
            <Input
              color="purple"
              icon={<FaUser />}
              label="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-[60vh] ">
            <Input
              color="purple"
              icon={<FaLock />}
              label="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            loading={loading}
            className="w-[60vh] flex justify-center items-center"
            color="purple"
            variant="gradient"
            type="submit"
          >
            <p>Login</p>
          </Button>
        </form>
        <p
          onClick={handleNavigateToAdmin}
          className="cursor-pointer font-medium text-purple-300 underline"
        >
          Admin
        </p>
      </div>

      <Alert
        open={open}
        onClose={() => setOpen(false)}
        color="red"
        className="fixed top-5 right-5 w-72"
        animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
      >
        Wrong Credentials!
      </Alert>
    </>
  );
}

export default StudentLoginPage;

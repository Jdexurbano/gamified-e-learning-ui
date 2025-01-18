import { FaUser, FaLock } from "react-icons/fa6";
import { Input, Button, Alert } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PORT } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNavigateToStudent = () => navigate("/");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };
    const payload = JSON.stringify(data);

    try {
      const response = await axios.post(`${PORT}/admin`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/admin/home");
      }
    } catch (error) {
      setOpen(true);
      setLoading(false);
    }
  };
  return (
    <>
      <main className="w-full h-screen grid grid-cols-[2fr_2fr]">
        {/* left column */}
        <div className="bg-purple-200/10">
          <div className="flex flex-col justify-center items-center gap-2 mt-20">
            <img src="./images/logo.png" alt="" className="w-40 h-40" />
            <div className="text-center text-gray-800">
              <h3 className="font-bold text-2xl">
                Malasiqui Adventist School, Inc.
              </h3>
              <p className="font-medium text-1xl">Malasiqui, Pangasinan</p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-4 mt-36">
            <h1 className="font-bold text-6xl text-gray-900">
              Welcome to <span className="text-purple-700">Creative</span>
            </h1>
            <h1 className="font-bold text-6xl text-gray-900">Learning!</h1>
          </div>
        </div>


        {/* right column */}
        <div className="bg-purple-700 flex flex-col items-center">
          <div className="w-[69vh] flex flex-col justify-center items-center gap-4 bg-gray-50 mt-80 px-5 pt-8 pb-10 rounded-md shadow-2xl">
            <div className="self-start text-left ml-7">
              <h1 className="font-semibold text-2xl text-purple-400">Welcome Back!</h1>
              <p className="text-gray-700 mt-2">Log In As Admin</p>
            </div>
            <form
              onSubmit={handleLogin}
              className="w-[60vh] flex flex-col items-center gap-3 mt-2"
            >
              <div className="w-[60vh] ">
                <Input
                  color="purple"
                  icon={<FaUser />}
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="w-[60vh] ">
                <Input
                  color="purple"
                  icon={<FaLock />}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                loading={loading}
                className="w-[60vh] flex justify-center items-center mt-7"
                color="purple"
                variant="gradient"
                type="submit"
              >
                <p>Login</p>
              </Button>
            </form>
            <p
              onClick={handleNavigateToStudent}
              className="cursor-pointer font-medium text-purple-300"
            >
              Log in as a Student
            </p>
          </div>
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
      </main>
    </>
  );
}

export default AdminLogin;

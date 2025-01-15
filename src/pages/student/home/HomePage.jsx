import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
function HomePage() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/count-the-fruits");
  return (
    <>
      <main className="w-full  border-2 px-24 py-10">
        <h1 className="text-4xl font-bold text-purple-700">Courses</h1>

        <Card className="mt-6 w-96 border">
          <CardHeader
            color="blue-gray"
            className="relative h-56"
            floated={false}
          >
            <img
              src="../images/count_fruits.jpg"
              alt="card-image"
              className="hover:bg-[#FFFFFF80]"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Count The Fruits
            </Typography>
            <Typography>
              Let’s have fun counting yummy fruits! Look at the picture, count
              all the fruits, and tell us how many you see. It’s easy, colorful,
              and super fun for little counters like you!
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 ">
            <Button onClick={handleNavigate} color="deep-purple">
              Play Now
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

export default HomePage;

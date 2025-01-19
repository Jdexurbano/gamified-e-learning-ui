import React from "react";
import StudentNavBar from "../../partials/student/StudentNavBar";
import { Outlet } from "react-router-dom";
function StudentLoginLayout() {
  return (
    <>
      <main className="w-full h-screen grid grid-cols-[2fr_2fr]">
        {/* left column */}
        <div className="bg-purple-200/10">
          <div className="flex flex-col justify-center items-center gap-2 mt-10">
            <img src="./images/logo.png" alt="" className="w-24 h-24" />
            <div className="text-center text-gray-800">
              <h3 className="font-bold text-lg">
                Malasiqui Adventist School, Inc.
              </h3>
              <p className="font-medium text-1xl">Malasiqui, Pangasinan</p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-4 mt-20">
            <h1 className="font-bold text-5xl text-gray-900">
              Welcome to <span className="text-purple-700">Creative</span>
            </h1>
            <h1 className="font-bold text-5xl text-gray-900">Learning!</h1>
          </div>
        </div>

        {/* right column */}
        <div className="bg-purple-700 flex flex-col items-center">
          <StudentNavBar />
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default StudentLoginLayout;

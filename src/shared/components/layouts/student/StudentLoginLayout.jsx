import React from "react";
import StudentNavBar from "../../partials/student/StudentNavBar";
import { Outlet } from "react-router-dom";
function StudentLoginLayout() {
  return (
    <>
      <main className="w-full h-screen grid grid-cols-[2fr_2fr]">
        {/* left column */}
        <div className="bg-purple-200/10">
          <div className="flex justify-center items-center gap-10 mt-4">
            <img src="./images/logo.png" alt="" className="w-20 h-20" />
            <div className="text-center text-gray-800">
              <h3 className="font-semibold">
                Malasiqui Adventist School, Inc.
              </h3>
              <p className="font-medium">Malasiqui,Pangasinan</p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-4 mt-24">
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

import { Outlet } from "react-router-dom";
import StudentMainNavBar from "../../partials/student/StudentMainNavBar";
function StudentMainLayout() {
  return (
    <>
      <main className="w-full h-screen">
        <StudentMainNavBar />
        <Outlet />
      </main>
    </>
  );
}

export default StudentMainLayout;

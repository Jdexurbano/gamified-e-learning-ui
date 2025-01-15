import { Link } from "react-router-dom";

function StudentNavBar() {
  console.log(location);
  const link = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "About",
      route: "/about",
    },
    {
      name: "Contact",
      route: "/contact",
    },
  ];
  return (
    <>
      <div className="w-full mt-4">
        <ul className="flex justify-center items-center gap-24 mt-2 font-semibold text-gray-50">
          {link.map((data, index) => {
            return (
              <Link key={index}>
                <li
                  className={`rounded-md px-4 py-1 hover:bg-[#FFFFFF80] ${
                    location.pathname === data.route ? "bg-[#FFFFFF80]" : ""
                  }`}
                >
                  {data.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default StudentNavBar;

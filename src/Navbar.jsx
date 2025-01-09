import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-transparent text-[#212529] flex justify-center ">
        <div className="bg-[#e9ecef] w-1/2 flex justify-between items-center rounded-3xl m-6 h-20 px-9 fixed z-10">
          <div className="text-3xl font-bold ">
            <Link to="/">AuthT</Link>
          </div>
          <ul className="flex flex-row text-2xl w-1/2 items-end justify-end gap-10 ">
            <li className=" px-2 rounded-lg shadow-xl border-solid border-2 border-transparent bg-[#ced4da] active:bg-[#adb5bd] hover:border-gray-400">
              <Link to="/add">Add </Link>
            </li>
            <li className=" px-2 rounded-lg shadow-xl border-solid border-2 border-transparent bg-[#ced4da] active:bg-[#adb5bd] hover:border-gray-400">
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Navbar;

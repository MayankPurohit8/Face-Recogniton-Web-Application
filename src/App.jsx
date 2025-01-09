import Add from "./Add";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./Search";
import Navbar from "./Navbar";
import Home from "./home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <div>
          <Navbar /> <Add />
        </div>
      ),
    },
    {
      path: "/search",
      element: (
        <div>
          <Navbar /> <Search />
        </div>
      ),
    },
  ]);
  return (
    <>
      <div className="bg-[#f8f9fa]">
        <div className="">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;

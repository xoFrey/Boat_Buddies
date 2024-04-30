import { IoBoatSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FilterBoats } from "../Context/Context";

const Navigation = () => {
  const { filter, setFilter } = useContext(FilterBoats);
  console.log(filter);
  return (
    <header className="w-[100px] min-h-screen bg-slate-500 fixed flex justify-center items-center ">
      <nav className="flex flex-col justify-around min-h-screen">
        {/* OnClick State/Filter auf all Boats setzen */}
        <Link to="/boats" className="cursor-pointer" onClick={() => setFilter("allBoats")}>
          <IoBoatSharp size={50} />
        </Link>
        {/* OnClick State/Filter auf Reservation setzen */}
        <Link to="/boats" onClick={() => setFilter("reservedBoats")} className="cursor-pointer">
          <FaRegCalendarAlt size={50} />
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;

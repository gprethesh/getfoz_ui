import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination() {
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex items-center justify-center h-32">
      <nav className="flex space-x-2">
        <Link
          to="#"
          className={`${
            activePage === 1 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-3 rounded-md`}
          onClick={() => setActivePage(activePage - 1)}
        >
          <FaChevronLeft />
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 1 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(1)}
        >
          1
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 2 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(2)}
        >
          2
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 3 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(3)}
        >
          3
        </Link>
        {/* Rest of the links */}
        <Link
          to="#"
          className={`${
            activePage === 4 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(4)}
        >
          4
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 5 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(5)}
        >
          5
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 6 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(6)}
        >
          6
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 7 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(7)}
        >
          7
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 8 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(8)}
        >
          8
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 9 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(9)}
        >
          9
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 10 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-2 rounded-md`}
          onClick={() => setActivePage(10)}
        >
          10
        </Link>
        <Link
          to="#"
          className={`${
            activePage === 10 ? "bg-[#0055FF] " : "text-white"
          } px-3 py-3 rounded-md`}
          onClick={() => setActivePage(activePage + 1)}
        >
          <FaChevronRight />
        </Link>
      </nav>
    </div>
  );
}

export default Pagination;

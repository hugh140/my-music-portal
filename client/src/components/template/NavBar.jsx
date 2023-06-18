import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import navbarOptions from "../../utilities/navbarOptions";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const menuIcon = useRef();
  const menuOptions = useRef();

  function handleClickMenu() {
    setToggle(!toggle);

    if (toggle) {
      menuIcon.current.classList.remove("rotate-off");
      menuIcon.current.classList.add("rotate-on");
      menuOptions.current.classList.remove("menu-on");
      menuOptions.current.classList.add("menu-off");
    } else {
      menuIcon.current.classList.remove("rotate-on");
      menuIcon.current.classList.add("rotate-off");
      menuOptions.current.classList.remove("menu-off");
      menuOptions.current.classList.add("menu-on");
    }
  }

  return (
    <nav className="w-full text-center md:w-auto">
      <button
        className="relative block h-10 w-full bg-neutral-400 px-10 text-white
        hover:bg-neutral-600 active:bg-black md:hidden"
        onClick={handleClickMenu}
      >
        Menú
        <FontAwesomeIcon
          ref={menuIcon}
          className="absolute end-4 top-1/2 -translate-y-1/2 text-xl"
          icon={faCaretDown}
        />
      </button>
      <ul className="hidden md:block" ref={menuOptions}>
        {navbarOptions.map((option) => (
          <Link to={option.link} key={option.text}>
            <li
              className="border-b-2 border-neutral-200 px-10 py-3 font-semibold 
            duration-75 hover:bg-neutral-800 hover:text-white 
            active:bg-white active:text-black lg:px-20"
            >
              {option.text}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;

function NavBar({ options }) {
  return (
    <ul className="md:w-auto text-center w-full">
      {options.map((option) => (
        <a href="#" key={option}>
          <li className="py-3 px-10 font-semibold duration-75 hover:text-white hover:bg-neutral-800 border-neutral-200 border-b-2">
            {option}
          </li>
        </a>
      ))}
    </ul>
  );
}
export default NavBar;

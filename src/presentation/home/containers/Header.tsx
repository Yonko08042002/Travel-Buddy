import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import UserMenuContainer from "./UserMenuContainer";

export default function Header() {
  return (
    <div className=" px-2 lg:px-16 py-2 w-full flex justify-between items-center   sticky top-[-1px]  bg-white z-50 shadow-md shadow-primary/10">
      <div className="flex gap-3 items-center">
        {" "}
        <Logo />
        <Search />
      </div>
      <div className=" flex items-center justify-center gap-2 lg:gap-8">
        <Navbar />
        <div className="hidden lg:block w-[1px] h-full min-h-9 bg-black"> </div>
        <UserMenuContainer />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";
import Providers from "./Providers";
import Appbar from "./Appbar";

function Navbar() {
  return (
    <nav className="flex justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          QErrE
        </h1>
      </Link>

      <div className="flex gap-x-2 items-center">
        <ModeToggle />
        
      </div>
      <Providers>
          <Appbar />
        </Providers>
    </nav>
  );
}

export default Navbar;

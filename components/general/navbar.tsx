import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={28} height={28} />
        <h1 className="text-2xl font-semibold">
          Job<span className="text-primary">Wave</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
      </div>
    </nav>
  );
}

import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { auth } from "@/app/utils/auth";
import { UserDropdown } from "../forms/user-dropdown/user-dropdown";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={28} height={28} />
        <h1 className="text-2xl font-semibold">
          Job<span className="text-primary">Wave</span>
        </h1>
      </Link>

      {/* desktop navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link className={buttonVariants({ size: "lg" })} href="/post-job">
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

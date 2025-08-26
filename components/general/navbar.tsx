import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { auth, signOut } from "@/app/utils/auth";

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

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/login",
              });
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

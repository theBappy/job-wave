import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex self-center items-center gap-2">
          <Image src={Logo} alt="logo" className="size-10" />
          <h1 className="text-2xl font-semibold">
            Job<span className="text-primary">Wave</span>{" "}
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-[70vh] flex flex-col gap-4 justify-center items-center">
      <h1 className="md:text-4xl text-3xl">404, Not Found!</h1>
      <p className="md:text-3xl text-2xl text-center">Could not find requested page</p>
      <Link href="/" className="text-2xl text-blue-400 hover:text-blue-500">
        Return Home
      </Link>
    </div>
  );
}

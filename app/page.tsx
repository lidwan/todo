import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className=" h-[76vh] md:h-[78vh] w-[99.1vw] flex flex-col justify-center items-center md:text-[3vw] lg:text-[2vw] text-[7vw] text-center p-6 gap-6">
        <div>
          A simple Todo web app. <br />
          Sign-In / Sign-up to start using the app!
        </div>
        <img
          src={"/todo.png"}
          alt="Preview of web app"
          width={200}
          height={200}
          className="w-[95%] md:w-[65%] lg:w-[50%]"
        />
      </div>
      <Footer />
    </>
  );
}

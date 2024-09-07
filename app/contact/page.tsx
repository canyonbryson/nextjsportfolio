import Contact from "@/components/Contact";

export default function contact() {
  return (
    <div className="w-full">
      <p className="h1-bold text-dark100_light900 mb-12 w-full text-center font-bold">
        Message Me
      </p>
      <Contact type={"Create"} />
    </div>
  );
}

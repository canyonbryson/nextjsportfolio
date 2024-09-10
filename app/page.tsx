import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cardClasses =
    "background-light800_dark300 max-w-80 min-h-48 hover:cursor-pointer hover:border-black hover:dark:border-white text-dark300_light700 body-regular mt-4 rounded-lg border border-light-700 p-3 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";
  return (
    <div className="flex flex-col items-center p-0">
      <Image
        src="/assets/images/profile.jpg"
        className="rounded-full"
        width={180}
        height={180}
        alt="me"
      />
      <h1 className="text-dark100_light900 h1-bold mt-10">
        Portfolio Overview
      </h1>
      <div className="flex w-full flex-row flex-wrap items-center gap-8">
        <Link href={"/education"} className={cardClasses}>
          <p className="font-bold">Education</p>
          <p>Bachelor&apos;s of Science in Computational Math and CS minor</p>
        </Link>
        <Link href={"/experience"} className={cardClasses}>
          <p className="font-bold">Experience</p>
          <p>4+ years of professional full-stack development experience</p>
        </Link>
        <Link href={"/experience"} className={cardClasses}>
          <p className="font-bold">Most Recent Job</p>
          <p>Lead Developer for Riddler Road Rally</p>
        </Link>
        <Link href={"/skills"} className={cardClasses}>
          <p className="font-bold">Top Skills</p>
          <p>React/Next.js in Typescript, TailwindCSS, AWS, DynamoDB</p>
        </Link>
        <Link href={"/projects"} className={cardClasses}>
          <p className="font-bold">Personal Project 1</p>
          <p>www.useSwiftCode.com</p>
          <p>Custom AI Assistant Builder + Chatbot + Operations Automator</p>
        </Link>
        <Link href={"/projects"} className={cardClasses}>
          <p className="font-bold">Personal Project 2</p>
          <p>https://nextjs-technical-blog.vercel.app/</p>
          <p>Personal Technical Blog</p>
        </Link>
      </div>
    </div>
  );
}

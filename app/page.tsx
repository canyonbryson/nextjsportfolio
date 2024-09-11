import Spline from "@splinetool/react-spline/next";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cardClasses =
    "background-light750_dark300 max-w-80 min-h-52 hover:cursor-pointer hover:border-black hover:dark:border-white text-dark300_light700 body-regular mt-4 rounded-lg border border-light-500 p-3 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";
  return (
    <div className="h- z-10 flex flex-col items-center p-0">
      <h1 className="text-dark100_light900 h1-bold z-10 mb-6">
        Portfolio Overview
      </h1>
      <Image
        src="/assets/images/profile.jpg"
        className="z-10 mb-4 rounded-full"
        width={180}
        height={180}
        alt="me"
      />
      <div className="z-10 flex w-full flex-row flex-wrap items-center gap-8">
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
          <p className="self-start text-start text-sm italic">
            Astro + Solidjs, Serverless AWS, Typescript, React native
          </p>
          <p>Lead and Sole Developer for Riddler Road Rally.</p>
        </Link>
        <Link href={"/skills"} className={cardClasses}>
          <p className="font-bold">Top Skills</p>
          <p>React/Next.js in Typescript, TailwindCSS, AWS, DynamoDB</p>
        </Link>
        <Link href={"https://www.useswiftcode.com"} className={cardClasses}>
          <p className="font-bold">Personal Project: AI Builder</p>
          <p className="self-start text-start text-sm italic">
            Astro + Solidjs, SST, Typescript
          </p>
          <p>Custom AI Assistant Builder + Chatbot + Automator</p>
        </Link>
        <Link
          href={"https://dex-swap-pied.vercel.app/"}
          className={cardClasses}
        >
          <p className="font-bold">Personal Project: DEX Swap</p>
          <p className="self-start text-start text-sm italic">
            Next.js, Typescript
          </p>
          <p>Connect your coinbase wallet and exchange cryptocurrencies.</p>
        </Link>
        {/* <Link
          href={"https://nextjs-technical-blog.vercel.app/"}
          className={cardClasses}
        >
          <p className="font-bold">Personal Blog</p>
          <p className="self-start text-start text-sm italic">
            Next.js, Markdown, Typescript
          </p>
          <p>Technical Blog following my learning progression.</p>
        </Link> */}
      </div>
      <div className="fixed z-[5] size-full bg-white opacity-35 dark:bg-black"></div>
      <div className="fixed z-0 size-full">
        <div className="absolute z-0 size-full">
          <Spline scene="https://prod.spline.design/RwYhjBfvJE1VmqcF/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}

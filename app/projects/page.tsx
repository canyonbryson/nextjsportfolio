import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const cardClasses =
    "background-light750_dark300 hover:cursor-pointer hover:border-black hover:dark:border-white w-80 min-h-48 text-dark300_light700 body-regular mt-5 rounded-lg border border-light-700 p-4 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-dark100_light900 h1-bold mt-10">Personal Projects</h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-4">
        <div className={cardClasses}>
          <p>Portfolio (this website)</p>
          <p className="self-start text-start text-sm italic">
            Next.js + MongoDB + Tailwind + Shadcn
          </p>
          <p className="text-lg font-normal">
            Displays my resume, projects, and bio.
          </p>
          <div className="mt-2 flex w-full items-center justify-center align-middle">
            <Image
              src="/assets/images/portfolio.png"
              width={280}
              height={280}
              alt="useswiftcode.com"
            />
          </div>
        </div>
        <Link href={"https://www.useswiftcode.com"} className={cardClasses}>
          <p>www.UseSwiftCode.com</p>
          <p className="self-start text-start text-sm italic">
            Astro + Solidjs + SST + DynamoDB
          </p>
          <p className="text-lg font-normal">
            Users can train & build an AI Assistant + Chatbot.
          </p>
          <div className="mt-2 flex w-full items-center justify-center align-middle">
            <Image
              src="/assets/images/swiftcode.png"
              width={300}
              height={300}
              alt="useswiftcode.com"
            />
          </div>
        </Link>
        <Link
          href={"https://nextjs-technical-blog.vercel.app/"}
          className={cardClasses}
        >
          <p>Technical Blog</p>
          <p className="self-start text-start text-sm italic">
            Next.js + Mardown + Vercel
          </p>
          <p className="text-lg font-normal">
            Technical Blog following my learning progression.
          </p>
          <div className="mt-2 flex w-full items-center justify-center align-middle">
            <Image
              src="/assets/images/blog.png"
              width={300}
              height={300}
              alt="useswiftcode.com"
            />
          </div>
        </Link>
        {/*  */}
        <Link
          href={"https://dex-swap-pied.vercel.app/"}
          className={cardClasses}
        >
          <p>DEX Swap</p>
          <p className="self-start text-start text-sm italic">
            React, Express, Typescript
          </p>
          <p className="text-lg font-normal">
            Connect your coinbase wallet and exchange one cryptocurrency for
            another.
          </p>
        </Link>
        <Link href={"https://ml.useswiftcode.com/"} className={cardClasses}>
          {" "}
          <p>ML Shakespeare Generator</p>
          <p className="self-start text-start text-sm italic">
            Astro + Solidjs, python
          </p>
          <p className="text-lg font-normal">
            Custom-made ML model that speaks like shakespeare. Functional, but
            improvements are still in progress.
          </p>
        </Link>
        <div className={cardClasses}>
          <p>BluJay</p>
          <p className="self-start text-start text-sm italic">
            Flutter + Firebase
          </p>
          <p className="text-lg font-normal">
            Social Media app for local events. No longer listed on the app
            store.
          </p>
        </div>
        <div className={cardClasses}>
          <p>ChessPuzzler</p>
          <p className="self-start text-start text-sm italic">
            React native + Local Storage
          </p>
          <p className="text-lg font-normal">
            Made in under 24 hours during USU&apos;s hackathon event. Chess app
            that generates puzzles based on online games. No longer listed on
            the app store.
          </p>
        </div>
        <div className={cardClasses}>
          <p>Fantastic Sudoku</p>
          <p className="self-start text-start text-sm italic">
            Flutter + Firebase
          </p>
          <p className="text-lg font-normal">
            Sudoku app for sudoku variants. Published by &apos;canlin&apos; on
            the app/play store.
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

const cardClasses =
  "background-light800_dark300 text-dark300_light700 body-regular mt-5 rounded-lg border border-light-700 p-4 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";

export default function Experience() {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex flex-row flex-wrap items-center gap-12">
        <Image
          src="/assets/images/usu.jpeg"
          className="rounded-full"
          width={120}
          height={120}
          alt="me"
        />
        <p className="text-dark100_light900 h1-bold background-light700_dark400 flex size-[120px] flex-col justify-center rounded-full text-center align-middle">
          A I D I A
        </p>
        <div className="text-dark100_light900 h1-bold flex size-[120px] flex-col items-center justify-center rounded-full bg-black text-center align-middle">
          <Image
            src="/assets/images/riddler.png"
            className="bg-black dark:bg-black"
            width={90}
            height={90}
            alt="me"
          />
        </div>
      </div>
      <h1 className="text-dark100_light900 h1-bold mt-10">
        4+ years of Professional Experience
      </h1>
      <div className={cardClasses}>
        <p>Lead Developer - Riddler Road Rally</p>
        <p className="self-start text-start text-sm italic">6 months</p>
        <p className="text-lg font-normal">
          Full Stack Development using a Astro + Solidjs, React Native, and
          Serverless (All Typescript), deployed https://www.riddlerroadrally.com
          along with the mobile app.
        </p>
      </div>
      <div className={cardClasses}>
        <p>Software Developer - AIDIA</p>
        <p className="self-start text-start text-sm italic">2 years</p>
        <p className="text-lg font-normal">
          Full Stack Development using a variety of frameworks (React, Astro,
          Solid, etc) and architectures (Event-driven, sql and no-sql,
          functional, etc) based largely in typescript to build any type
          software from custom object-recognition algorithms to mobile apps and
          websites.
        </p>
      </div>
      <div className={cardClasses}>
        <p>Software Developer - Utah State University</p>
        <p className="self-start text-start text-sm italic">1 year</p>
        <p className="text-lg font-normal">
          Full Stack development using frameworks like Django/Python,
          React/Typescript, and Next.js to build software for the networking
          team. Used postgresql for the database.
        </p>
      </div>
      <div className={cardClasses}>
        <p>Research Assistant - Utah State University</p>
        <p className="self-start text-start text-sm italic">2 years</p>
        <p className="text-lg font-normal">
          Prepared and taught students at a summer camp Creative Engineering
          principles, as well as what we were currently researching in the lab
          (CRISPR). This involved understanding the complex research, and
          simplifying it down to hands-on experiments. Involved programming in
          Python.
        </p>
      </div>
    </div>
  );
}

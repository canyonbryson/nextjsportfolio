import Image from "next/image";

const cardClasses =
  "background-light750_dark300 text-dark300_light700 body-regular mt-5 rounded-lg border border-light-700 p-4 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";

export default function Education() {
  return (
    <div className="flex flex-col items-center p-2">
      <Image
        src="/assets/images/usu.jpeg"
        className="rounded-full"
        width={200}
        height={200}
        alt="me"
      />
      <h1 className="text-dark100_light900 h1-bold mt-10">
        Bachelor&apos;s of Science in Computational Math
      </h1>
      <h3 className="text-dark100_light900 mt-1 text-lg font-normal">
        Minor in Computer Science
      </h3>
      <p className={cardClasses}>3.71 GPA</p>
      <p className={cardClasses}>
        Presidential Scholarship & Regents Scholarship
      </p>
      <p className={cardClasses}>URCO Grant Recipient with Impact Initiative</p>
    </div>
  );
}

const cardClasses =
  "background-light750_dark300 text-dark300_light700 body-regular mt-5 rounded-lg border border-light-700 p-4 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";

export default function Skills() {
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-dark100_light900 h1-bold mt-10">Skills</h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-4">
        <div className={cardClasses}>
          <p>Databases</p>
          <p className="text-lg font-normal">ORMS: Prisma, Drizzle</p>
          <p className="text-lg font-normal">NoSQL: MongoDB, DynamoDB</p>
          <p className="text-lg font-normal">
            SQL: Postgresql, MySQL, SQLite, Planetscale
          </p>
        </div>
        <div className={cardClasses}>
          <p>Frontend</p>
          <p className="text-lg font-normal">Astro + Solidjs</p>
          <p className="text-lg font-normal">Reactjs</p>
          <p className="text-lg font-normal">Next.js</p>
        </div>
        <div className={cardClasses}>
          <p>Styling</p>
          <p className="text-lg font-normal">Tailwind + DaisyUI</p>
          <p className="text-lg font-normal">MUI</p>
          <p className="text-lg font-normal">Shadcn</p>
          <p className="text-lg font-normal">CSS</p>
        </div>
        <div className={cardClasses}>
          <p>Backend</p>
          <p className="text-lg font-normal">SST</p>
          <p className="text-lg font-normal">Serverless + AWS Lambda</p>
          <p className="text-lg font-normal">Django</p>
          <p className="text-lg font-normal">Express</p>
        </div>
        <div className={cardClasses}>
          <p>Mobile</p>
          <p className="text-lg font-normal">React Native</p>
          <p className="text-lg font-normal">Flutter</p>
        </div>
        <div className={cardClasses}>
          <p>Deployment</p>
          <p className="text-lg font-normal">AWS</p>
          <p className="text-lg font-normal">Vercel</p>
        </div>
        <div className={cardClasses}>
          <p>Architectures</p>
          <p className="text-lg font-normal">3-tier</p>
          <p className="text-lg font-normal">Event-driven</p>
          <p className="text-lg font-normal">Serverless</p>
          <p className="text-lg font-normal">Microservices</p>
        </div>
      </div>
    </div>
  );
}

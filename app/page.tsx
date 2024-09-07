import Image from "next/image";

const cardClasses =
  "background-light800_dark300 text-dark300_light700 body-regular mt-5 rounded-lg border border-light-700 p-4 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-2">
      <Image
        src="/assets/images/profile.jpg"
        className="rounded-full"
        width={200}
        height={200}
        alt="me"
      />
      <h1 className="text-dark100_light900 h1-bold mt-10">
        Who is Canyon Bryson?
      </h1>
      <p className={cardClasses}>
        1. A husband and a dad to a beautiful baby boy (he is the cutest!).
      </p>
      <p className={cardClasses}>
        2. I am a marathon runner, an avid rock climber, and a chess enthusiast.
      </p>
      <p className={cardClasses}>
        3. I am a full stack software engineer and AI/ML engineer with a passion
        for learning. I firmly believe that web3, AI, and the power of
        blockchain technology will revolutionize the world.
      </p>
      <p className={cardClasses}>
        4. I am a strong advocate for transparency and interoperability, and I
        am excited to help use technology to raise the standard of living across
        the globe.
      </p>
    </div>
  );
}

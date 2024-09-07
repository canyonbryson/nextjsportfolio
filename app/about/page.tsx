import Image from "next/image";

const cardClasses =
  "background-light800_dark300 max-w-80 h-80 text-dark300_light700 body-regular mt-4 rounded-lg border border-light-700 p-3 text-center text-2xl dark:border-dark-400 max-sm:mx-0 max-sm:text-left";

export default function About() {
  return (
    <div className="flex flex-col items-center p-0">
      <Image
        src="/assets/images/profile.jpg"
        className="rounded-full"
        width={180}
        height={180}
        alt="me"
      />
      <h1 className="text-dark100_light900 h1-bold mt-10">Who am I?</h1>
      <p className="text-dark100_light900 my-2 text-center text-xl font-normal">
        I&apos;m a husband to my beautiful wife and a dad to the best baby boy
        (he is the cutest!).
      </p>
      <div className="flex w-full flex-row flex-wrap items-center gap-3">
        <div className={cardClasses}>
          <p className="font-bold">My Hobbies</p>
          <p>
            I am a marathon runner, an avid rock climber, and a chess
            enthusiast. I love the discipline of the marathon, the mental
            fortitude of climbing, and the creativity and adaptability of chess.
          </p>
        </div>
        <div className={cardClasses}>
          <p className="font-bold">My Interests</p>
          <p>
            I am passionate about learning, and I firmly believe that web3, AI,
            and the power of blockchain technology will revolutionize the world.
          </p>
        </div>
        <p className={cardClasses}>
          <p className="font-bold">My Mission</p>
          <p>
            I am a strong advocate for transparency and interoperability, and I
            am excited to use technology to raise the standard of living across
            the globe.
          </p>
        </p>
      </div>
    </div>
  );
}

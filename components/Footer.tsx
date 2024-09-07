import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <nav className="flex-center background-light850_dark100 fixed bottom-0 -z-10 w-full gap-24 border-t-2 border-gray-200 p-6 shadow-light-400 dark:border-gray-800 dark:shadow-none sm:px-12">
      <Link
        href="https://www.linkedin.com/in/canyon-bryson-025815250/"
        target="_blank"
        className="flex items-center gap-1"
      >
        <Image
          src="/assets/images/linkedin.svg"
          width={23}
          height={23}
          alt="linkedin"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          <span className="text-primary-500">LinkedIn</span>
        </p>
      </Link>
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/github.svg"
          width={23}
          height={23}
          alt="github"
          className="rounded-full fill-black dark:bg-white"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          <span className="text-primary-500">Github</span>
        </p>
      </Link>
    </nav>
  );
};

export default Footer;

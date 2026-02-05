import Image from "next/image";

interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  columns?: 2 | 3;
}

export default function ScreenshotGallery({
  screenshots,
  columns = 2,
}: ScreenshotGalleryProps) {
  const gridCols = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {screenshots.map((screenshot, i) => (
        <figure key={i} className="group relative overflow-hidden rounded-xl">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          {screenshot.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {screenshot.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

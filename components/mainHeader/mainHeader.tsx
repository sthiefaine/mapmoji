"use client";
import { Country } from "@/data/mapmoji";
import styles from "./mainHeader.module.css";
import useIsClient from "@/hooks/isClient";
import { capitalizeFirstLetter } from "@/helpers/string";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type MainHeaderProps = {
  time?: Date;
  handleShareClick?: () => void;
  country?: Country;
};

export function MainHeader({
  time,
  handleShareClick,
  country,
}: MainHeaderProps) {
  const isClient = useIsClient();

  const displayShareButton = isClient
    ? navigator?.share === undefined
      ? "hidden"
      : "visible"
    : "hidden";

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <span className={styles.name}>
          {capitalizeFirstLetter(country?.name ?? "") + " " + country?.emoji}
        </span>
      </div>
      <div className={styles.element}>
        <button
          style={{ visibility: displayShareButton }}
          className={styles.button}
          onClick={handleShareClick}
        >
          <span className={styles.text}>Share</span>
          <DotLottieReact
            autoResizeCanvas
            style={{
              width: 40,
              height: 40,
            }}
            src="/icons/lottie/pictures.lottie"
            speed={0.8}
            autoplay
            mode="bounce"
            loop
          />
        </button>
      </div>
    </div>
  );
}

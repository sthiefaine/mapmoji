"use client";
import { Country } from "@/data/mapmoji";
import styles from "./mainFooter.module.css";
import useIsClient from "@/hooks/isClient";
import { capitalizeFirstLetter } from "@/helpers/string";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Selector } from "../selector/selector";

type MainHeaderProps = {
  time?: Date;
  handleShareClick?: () => void;
  country?: Country;
};

export function MainFooter({
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
      <Selector country={country} />

      <div className={styles.element}>
        <button
          style={{ visibility: displayShareButton }}
          className={styles.button}
          onClick={handleShareClick}
        >
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

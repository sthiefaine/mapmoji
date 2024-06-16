"use client";
import { Country } from "@/data/mapmoji";
import styles from "./mainFooter.module.css";
import useIsClient from "@/hooks/isClient";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Selector } from "../selector/selector";
import { Search } from "../search/search";
import { useState } from "react";

type MainHeaderProps = {
  time?: Date;
  handleShareClick?: () => void;
  country: Country;
};

export function MainFooter({
  time,
  handleShareClick,
  country,
}: MainHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const isClient = useIsClient();

  const displayShareButton = isClient
    ? navigator?.share === undefined
      ? "hidden"
      : "visible"
    : "hidden";

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          country={country}
        />

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

      <Selector
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        country={country}
      />
    </div>
  );
}

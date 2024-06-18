import { Country, countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/helpers/string";
import { useEffect, useState } from "react";

type SelectorProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  country: Country;
};

export function Selector({
  searchValue,
  setSearchValue,
  country,
}: SelectorProps) {
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countriesList);
  useEffect(() => {
    if (!searchValue) {
      setFilteredCountries(countriesList);
      return;
    }
    setFilteredCountries(
      countriesList.filter((c) => {
        const countryName = c.name?.toLowerCase();
        const countryCode = c.countryCode?.toLowerCase();

        const searchTerms = searchValue?.toLowerCase().split(" ");

        return searchTerms.some(
          (term) => countryName.includes(term) || countryCode.includes(term)
        );
      })
    );
  }, [searchValue, setSearchValue]);

  // scroll to selected country
  useEffect(() => {
    if (!country) return;
    const selectedCountry = document.getElementById(
      country?.name.toLocaleLowerCase()
    );
    if (selectedCountry) {
      const timeoutId = setTimeout(() => {
        selectedCountry.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 800);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [country]);

  return (
    <div className={styles.selector}>
      {filteredCountries.length === 0 && (
        <button
          className={`${styles.button}`}
          onClick={() => setSearchValue("")}
        >
          🏴‍☠️ No result found
        </button>
      )}

      {filteredCountries.map((c, index) => {
        return (
          <Link
            id={c?.name.toLocaleLowerCase()}
            key={index + c.name}
            href={`/country/${c.name.toLowerCase()}`}
            onClick={() => setSearchValue("")}
          >
            <button
              className={`${styles.button} ${
                country?.name === c.name ? styles.selected : ""
              }`}
            >
              {c?.emoji} {capitalizeFirstLetter(c?.name)}
            </button>
          </Link>
        );
      })}
    </div>
  );
}

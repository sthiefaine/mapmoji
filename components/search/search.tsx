import { Country, countriesList } from "@/data/mapmoji";
import styles from "./search.module.css";
import { capitalizeFirstLetter } from "@/helpers/string";

type SearchProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  country: Country;
};

export function Search({ searchValue, setSearchValue, country }: SearchProps) {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="search"
        list="countries"
        value={searchValue}
        placeholder="Search country"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <datalist className={styles.datalist} id="countries">
        {countriesList.map((country) => (
          <option
            className={styles.option}
            key={country.name}
            value={
              capitalizeFirstLetter(country.name) + " " + country.countryCode
            }
          />
        ))}
      </datalist>
    </div>
  );
}

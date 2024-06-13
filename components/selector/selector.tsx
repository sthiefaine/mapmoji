"use client";
import { countriesList } from "@/data/mapmoji";
import styles from "./selector.module.css";
import { usePathname } from "next/navigation";

type SelectorProps = {
  time?: Date;
  handleShareClick?: () => void;
  capturedImage?: string;
};

export function Selector({
  time,
  handleShareClick,
  capturedImage,
}: SelectorProps) {
  const pathname = usePathname();
  const pathNameClean =
    pathname.split("/")?.[2]?.toLowerCase()?.trim() ?? "brazil";
  const timezone =
    countriesList.find((country) => country.name === pathNameClean)?.timeZone ??
    "UTC";

  const getLocalTime = new Intl.DateTimeFormat("fr-FR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(time);

  const handleWhatsAppShare = () => {
    if (capturedImage) {
      const url = `https://wa.me/?text=${encodeURIComponent(capturedImage)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <span className={styles.name}>Brazil 🇧🇷</span>
        <span className={styles.time}>{getLocalTime}</span>
      </div>
      <div className={styles.element}>
        <button className={styles.button} onClick={handleShareClick}>
          Share 📸
        </button>
      </div>
    </div>
  );
}

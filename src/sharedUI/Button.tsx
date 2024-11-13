import styles from "@/styles/button.module.css";
import { FC } from "react";

interface props {
  data: string | null;
  size: boolean | null;
}
const button: FC<props> = ({ data, size }) => {
  return <div className={size ? styles.btnBig : styles.btnSmall}>{data}</div>;
};

export default button;

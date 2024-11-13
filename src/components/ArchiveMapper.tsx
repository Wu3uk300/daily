"use client";
import styles from "@/styles/archiveMapper.module.css";
import { FC, useState } from "react";

interface MyObject {
  id: number;
  advice: string;
}
interface ArchiveMapperInterface {
  advicesM: MyObject[];
  advicesP: MyObject[];
}
const ArchiveMapper: FC<ArchiveMapperInterface> = ({ advicesM, advicesP }) => {
  const [category, setCategory] = useState("Mental");

  return (
    <div>
      <div className={styles.customSelectContainer}>
        <input
          type="radio"
          id="option1"
          value="Mental"
          name="goal"
          className={styles.radioInput}
          onChange={() => setCategory("Mental")}
          defaultChecked
        />
        <label htmlFor="option1" className={styles.radioLabel}>
          Mental
        </label>
        <input
          type="radio"
          id="option2"
          name="goal"
          value="Physic"
          className={styles.radioInput}
          onChange={() => setCategory("Physical")}
        />
        <label htmlFor="option2" className={styles.radioLabel}>
          Physical
        </label>
      </div>
      <div className={styles.archiveBlocks}>
        {category === "Mental" ? (
          <>
            {advicesM.length === 0 ? (
              <>
                <div className={styles.dontHave}>
                  You do not have any mental advice in the archive
                </div>
              </>
            ) : (
              <>
                {advicesM.map((obj) => (
                  <div key={obj.id} className={styles.archiveBlock}>
                    <div>{obj.advice}</div>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {advicesP.length === 0 ? (
              <>
                <div className={styles.dontHave}>
                  You do not have any physical advice in the archive
                </div>
              </>
            ) : (
              <>
                {advicesP.map((obj) => (
                  <div key={obj.id} className={styles.archiveBlock}>
                    <div>{obj.advice}</div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArchiveMapper;

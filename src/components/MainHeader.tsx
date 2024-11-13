"use client";
import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@/styles/mainHeader.module.css";
import { redirect } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface QuoteInterface {
  id: number | null;
  quote: string | null;
  author: string | null;
}

interface MainHeaderProps {
  quote: QuoteInterface | null;
}

const MainHeader: FC<MainHeaderProps> = ({ quote }) => {
  const { isAuthenticated } = useKindeBrowserClient();

  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    const animationTimer = setTimeout(() => {
      setAnimation(false);
    }, 6000);
    setTimeout(() => {
      {
        if (isAuthenticated) {
          redirect("/task");
        } else {
          redirect("/task");
        }
      }
    }, 10500);
    return () => clearTimeout(animationTimer);
  }, []);
  return (
    <div>
      <CSSTransition
        in={animation}
        timeout={6000}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.wholeQuote}>
          <blockquote className={styles.quote}>{quote?.quote}</blockquote>
          <cite className={styles.author}>- {quote?.author}</cite>
        </div>
      </CSSTransition>
    </div>
  );
};

export default MainHeader;

import styles from "@/styles/changeIt.module.css";
import Button from "@/sharedUI/Button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const changeIt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.changeItHeader}>
        Take the first step today. Improve your life with our daily advice!
      </div>
      <div className={styles.changeIt}>
        <LoginLink>
          <Button size={true} data={"START RIGHT NOW"} />
        </LoginLink>
      </div>
    </div>
  );
};

export default changeIt;

import Navbar from "@/components/Navbar";
import styles from "@/styles/infoPage.module.css";
import Image from "next/image";
import Button from "@/sharedUI/Button";
import mind from "@/imgs/mind.png";
import dumbell from "@/imgs/dumbell.png";
import HowItWorks from "@/components/HowItWorks";
import Plans from "@/components/Plans";
import FAQ from "@/components/Faq";
import ChangeIt from "@/components/ChangeIt";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import VIdeo from "@/components/VIdeo";

const Info = () => {
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <div className={styles.header}>
              Unlock your potential <br />{" "}
              <span className={styles.textLower}>
                with a daily dose of wellness!
              </span>
              <div className={styles.subText}>
                Enhance mental and physical well-being <br /> and become better
                every day !
              </div>
              <div className={styles.btnsFormed}>
                <div className={styles.registerBtn}>
                  {" "}
                  <RegisterLink>
                    <Button size={false} data="BECOME BETTER" />
                  </RegisterLink>
                </div>

                <div className={styles.alreadyBtn}>
                  {" "}
                  <LoginLink>
                    <Button size={false} data="I ALREADY HAVE AN ACCOUNT" />
                  </LoginLink>
                </div>
              </div>
            </div>

            <div>
              <VIdeo />
            </div>
          </div>

          <div id="info" className={styles.mindAndPhysic}>
            <div className={styles.infoBlock}>
              <div className={styles.infoImg}>
                <Image src={mind} alt="mind" width={200} height={200}></Image>
              </div>
              <div className={styles.infoBox}>
                <h2 className={styles.header}>Mental health</h2>
                <div className={styles.infoText}>
                  Mental health is essential for a balanced and fulfilling life.
                  Get daily advice designed to help you manage stress, improve
                  emotional well-being, and build mental resilience over time.{" "}
                  <br /> <br /> Each tip is tailored to guide you in taking
                  small but meaningful steps toward a healthier mind, whether
                  it’s practicing mindfulness, setting boundaries, or finding
                  ways to relax. With consistent focus and action every day,
                  you’ll gradually strengthen your mental health and create
                  lasting positive change that will benefit all areas of your
                  life.
                </div>
                <LoginLink>
                  <div className={styles.infoBtn}>
                    <Button size={true} data={"IMPROVE MENTAL HEALTH"} />
                  </div>
                </LoginLink>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={styles.infoImg}>
                <Image
                  src={dumbell}
                  alt="mind"
                  width={200}
                  height={200}
                ></Image>
              </div>
              <div className={styles.infoBox}>
                <h2 className={styles.header}>Physical health</h2>
                <div className={styles.infoText}>
                  Physical health is key to maintaining overall wellness and
                  vitality. Receive daily advice on how to strengthen your body,
                  improve fitness, and boost energy levels. <br />
                  <br />
                  <br />
                  Whether it’s simple exercises, tips for better posture, or
                  ideas to stay active, these small actions will build up over
                  time to make a significant difference. By committing to
                  consistent effort every day, you’ll enhance your physical
                  health, prevent future issues, and enjoy the long-term
                  benefits of a stronger, healthier body.
                </div>
                <LoginLink>
                  <div className={styles.infoBtn}>
                    <Button size={true} data={"IMPROVE MY PHYSIC"} />
                  </div>
                </LoginLink>
              </div>
            </div>
          </div>
          <div id="howItWorks">
            {" "}
            <HowItWorks />
          </div>
        </div>
      </div>
      <div id="pricing">
        {" "}
        <Plans />
      </div>
      <div id="faq">
        <FAQ />
      </div>

      <ChangeIt />
    </div>
  );
};

export default Info;

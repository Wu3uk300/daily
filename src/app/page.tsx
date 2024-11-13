import styles from "@/styles/homePage.module.css";
import MainHeader from "../components/MainHeader";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  function getRandomNumber(min: number = 1, max: number = 20): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomNumber = getRandomNumber();

  const data = await prisma.quotes.findUnique({
    where: {
      id: randomNumber,
    },
  });
  return (
    <div className={styles.container}>
      <MainHeader quote={data} />
    </div>
  );
}

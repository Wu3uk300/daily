export const revalidate = 0; // Отключаем кэширование в Next.js
import styles from "@/styles/homePage.module.css";
import MainHeader from "../components/MainHeader";
import prisma from "@/prisma";

export default async function Home() {
  const quotesCount = await prisma.quotes.count();

  const randomId = Math.floor(Math.random() * quotesCount) + 1;

  const data = await prisma.quotes.findUnique({
    where: { id: randomId },
  });

  return (
    <div className={styles.container}>
      <MainHeader quote={data} />
    </div>
  );
}

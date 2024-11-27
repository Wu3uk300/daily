import styles from "@/styles/homePage.module.css";
import MainHeader from "../components/MainHeader";
import { PrismaClient } from "@prisma/client";
export const revalidate = 0;
export default async function Home() {
  const prisma = new PrismaClient();

  const quotesCount = await prisma.quotes.count();
  const randomId = Math.floor(Math.random() * quotesCount) + 1;

  const data = await prisma.quotes.findUnique({
    where: {
      id: randomId,
    },
  });

  return (
    <div className={styles.container}>
      <MainHeader quote={data} />
    </div>
  );
}

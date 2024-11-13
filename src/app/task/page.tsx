import Navbar from "@/components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import styles from "@/styles/taskPage.module.css";
import TaskBox from "@/components/TaskBox";
import prisma from "@/prisma";
import TaskBoxPremium from "@/components/TaskBoxPremium";
import LoadingOverlay from "@/components/LoadingOverlay";

const task = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/info");
  }
  if (isLoggedIn) {
    const data = await prisma.user.findUnique({
      where: {
        userid: user.id,
      },
    });
    if (data?.userid === undefined) {
      await prisma.user.create({
        data: {
          userid: user.id,
          plan: false,
          progressM: 0,
          progressP: 0,
          archieveM: [1],
          archieveP: [1],
        },
      });
    }
  }
  const data = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  const progressM = data?.progressM;
  const progressP = data?.progressP;
  const plan = data?.plan;

  return (
    <div className={styles.wholeContainer}>
      <LoadingOverlay />
      <Navbar />
      <div className={styles.container}>
        {plan === true ? (
          <TaskBoxPremium progressM={progressM} progressP={progressP} />
        ) : (
          <TaskBox progressM={progressM} progressP={progressP} />
        )}
      </div>
    </div>
  );
};

export default task;

import Navbar from "@/components/Navbar";
import styles from "@/styles/planspage.module.css";
import prisma from "@/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import PlansOnPlansPage from "@/components/PlansOnPlansPage";
import { revalidatePath } from "next/cache";
import LoadingOverlay from "@/components/LoadingOverlay";
const PlansPage = async () => {
  revalidatePath("/plans");
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/info");
  }

  const getUserData = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });

  const currentPlan = getUserData?.plan;

  return (
    <div className={styles.wholeContainer}>
      <LoadingOverlay />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <PlansOnPlansPage currentPlan={currentPlan} />
        </div>
      </div>
    </div>
  );
};

export default PlansPage;

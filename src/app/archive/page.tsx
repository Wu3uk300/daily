import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import styles from "@/styles/archivePage.module.css";
import Navbar from "@/components/Navbar";
import prisma from "@/prisma";
import Image from "next/image";
import lock from "@/imgs/icons8-lock-150.png";
import ArchiveMapper from "@/components/ArchiveMapper";
import LoadingOverlay from "@/components/LoadingOverlay";

interface Advice {
  id: number;
  advice: string;
}
const page = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/info");
  }
  const userData = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }

  const plan = userData?.plan;
  const archiveM = userData?.archieveM;
  const archiveP = userData?.archieveP;

  const advicesM: Advice[] = await prisma.mental.findMany();
  const advicesP: Advice[] = await prisma.physical.findMany();

  const filteredMentalAdvices = advicesM.filter((obj: Advice) =>
    archiveM?.includes(obj.id)
  );
  const sortedObjectsM = filteredMentalAdvices.sort(
    (a, b) => (archiveM?.indexOf(a.id) ?? 0) - (archiveM?.indexOf(b.id) ?? 0)
  );
  const finalDataM = sortedObjectsM.slice(0, -1).reverse();

  const filteredPhysicalAdvices = advicesP.filter((obj) =>
    archiveP?.includes(obj.id)
  );
  const sortedObjectsP = filteredPhysicalAdvices.sort(
    (a, b) => (archiveP?.indexOf(a.id) ?? 0) - (archiveP?.indexOf(b.id) ?? 0)
  );
  const finalDataP = sortedObjectsP.slice(0, -1).reverse();
  return (
    <div className={styles.wholeContainer}>
      <LoadingOverlay />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          {plan === false ? (
            <div className={styles.upgradeHeaderDiv}>
              <div className={styles.lockImg}>
                <Image src={lock} alt="lock" />
              </div>
              <div className={styles.upgradeHeader}>
                Upgrade your plan to access the archive
              </div>
            </div>
          ) : (
            <div className={styles.archiveMapper}>
              <ArchiveMapper advicesM={finalDataM} advicesP={finalDataP} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

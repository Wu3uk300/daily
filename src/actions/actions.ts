"use server";
import prisma from "@/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const getAMentalTip = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  const dataLength = (await prisma.mental.findMany()).length;

  // Проверяем, существует ли data
  if (!data || !data.archieveM) {
    return; // Завершаем функцию, если пользователь не найден
  }

  let randomNumber: number | undefined; // Изначально не присваиваем значение

  // Используем цикл, чтобы найти новое случайное число
  let found = false;
  let attempts = 0;

  while (!found && attempts < dataLength) {
    // Ограничиваем количество попыток
    randomNumber = Math.floor(Math.random() * dataLength) + 1; // Генерируем случайное число
    const checking = data.archieveM.includes(randomNumber); // Проверяем, есть ли число в массиве

    if (!checking) {
      found = true; // Если число не найдено, отмечаем его как найденное
    }
    attempts++;
  }

  // Если нашли новое число, обновляем archieveM
  if (found && randomNumber !== undefined) {
    await prisma.user.update({
      where: {
        userid: user.id,
      },
      data: {
        archieveM: [...data.archieveM, randomNumber], // Добавляем новое число к массиву
      },
    });
  } else {
    console.log("Не удалось найти новое число после нескольких попыток.");
  }
  revalidatePath("/archive");
};

export const getAPhysicalTip = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  const dataLength = (await prisma.physical.findMany()).length;
  // Проверяем, существует ли data
  if (!data || !data.archieveP) {
    return; // Завершаем функцию, если пользователь не найден
  }

  let randomNumber: number | undefined; // Изначально не присваиваем значение

  // Используем цикл, чтобы найти новое случайное число
  let found = false;
  let attempts = 0;

  while (!found && attempts < dataLength) {
    // Ограничиваем количество попыток
    randomNumber = Math.floor(Math.random() * dataLength) + 1; // Генерируем случайное число
    const checking = data.archieveP.includes(randomNumber); // Проверяем, есть ли число в массиве

    if (!checking) {
      found = true; // Если число не найдено, отмечаем его как найденное
    }
    attempts++;
  }

  // Если нашли новое число, обновляем archieveM
  if (found && randomNumber !== undefined) {
    // Проверяем, что randomNumber присвоено
    await prisma.user.update({
      where: {
        userid: user.id,
      },
      data: {
        archieveP: [...data.archieveP, randomNumber], // Добавляем новое число к массиву
      },
    });
  } else {
    console.log("Не удалось найти новое число после нескольких попыток.");
  }
  revalidatePath("/archive");
};

export const getAnActualMentalTip = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  const number = data?.archieveM[data.archieveM.length - 1];
  const tip = await prisma.mental.findUnique({
    where: {
      id: number,
    },
  });
  const tipText = tip?.advice;
  return tipText;
};

export const getAnActualPhysicalTip = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.user.findUnique({
    where: {
      userid: user.id,
    },
  });
  const number = data?.archieveP[data.archieveP.length - 1];
  const tip = await prisma.physical.findUnique({
    where: {
      id: number,
    },
  });
  const tipText = tip?.advice;
  return tipText;
};

export const progressMaker = async (selectedCategory: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (selectedCategory === "Mental") {
    const currentUser = await prisma.user.findUnique({
      where: {
        userid: user.id,
      },
      select: {
        progressM: true,
      },
    });
    await prisma.user.update({
      where: {
        userid: user.id,
      },
      data: {
        progressM: (currentUser?.progressM ?? 0) + 1,
      },
    });
  } else {
    const currentUser = await prisma.user.findUnique({
      where: {
        userid: user.id,
      },
      select: {
        progressP: true,
      },
    });
    await prisma.user.update({
      where: {
        userid: user.id,
      },
      data: {
        progressP: (currentUser?.progressP ?? 0) + 1,
      },
    });
  }
};
export const changePlan = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await prisma.user.update({
    where: {
      userid: user.id,
    },
    data: {
      plan: true,
    },
  });
  revalidatePath("/task");
  revalidatePath("/plans");
};

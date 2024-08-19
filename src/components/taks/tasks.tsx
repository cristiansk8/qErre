'use client'
import { TaskCard } from "@/components/task-card";
import prisma from "@/lib/prisma";
import React from "react";
import { useSession } from "next-auth/react";

export default async function UserTasks() {
  const { data: session } = useSession();


  const userEmail = session?.user?.email || '';
  const userId = 92;
  // Obtiene el ID del usuario basado en el correo electrónico
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return <p>No se encontró el usuario</p>;
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

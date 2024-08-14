"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData, userEmail: string) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const priority = formData.get("priority")?.toString();
  const qrCode = formData.get("qrCode")?.toString();

  if (!name || !description || !priority || !qrCode) {
    return;
  }

  try {
    // Buscar el usuario por correo
    const user = await prisma.user.findUnique({
      where: { correo: userEmail },
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    const newTask = await prisma.task.create({
      data: {
        name: name,
        description: description,
        priority: priority,
        qrCode: qrCode,
        userId: user.id, // Asignar el id del usuario encontrado
      },
    });

    redirect("/");
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

export async function updateTask(formData: FormData, userEmail: string) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const priority = formData.get("priority")?.toString();
  const qrCode = formData.get("qrCode")?.toString();

  if (!id || !name || !description || !priority || !qrCode) {
    return;
  }

  try {
    // Buscar el usuario por correo
    const user = await prisma.user.findUnique({
      where: { correo: userEmail },
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    // Actualizar la tarea
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) }, // Asegúrate de que el ID esté en el formato correcto
      data: {
        name: name,
        description: description,
        priority: priority,
        qrCode: qrCode,
        userId: user.id, // Asignar el id del usuario encontrado
      },
    });

    // Redirigir después de la actualización
    redirect("/");
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

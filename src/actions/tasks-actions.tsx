// actions/tasks-actions.ts

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
    return { success: false, message: "Please fill in all fields." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { correo: userEmail },
    });

    if (!user) {
      console.error("User not found");
      return { success: false, message: "User not found." };
    }

    await prisma.task.create({
      data: {
        name: name,
        description: description,
        priority: priority,
        qrCode: qrCode,
        userId: user.id, // Asignar el id del usuario encontrado
      },
    });

    return { success: true, message: "Task created successfully!" };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, message: "Error creating task." };
  }
}

export async function updateTask(formData: FormData, userEmail: string) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const priority = formData.get("priority")?.toString();
  const qrCode = formData.get("qrCode")?.toString();

  if (!id || !name || !description || !priority || !qrCode) {
    return { success: false, message: "Please fill in all fields." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { correo: userEmail },
    });

    if (!user) {
      console.error("User not found");
      return { success: false, message: "User not found." };
    }

    await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: {
        name: name,
        description: description,
        priority: priority,
        qrCode: qrCode,
        userId: user.id, // Asignar el id del usuario encontrado
      },
    });

    return { success: true, message: "Task updated successfully!" };
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, message: "Error updating task." };
  }
}

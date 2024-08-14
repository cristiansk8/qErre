"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/user";

export async function handleCreateUser(formData: FormData) {
  const name = formData.get("name")?.toString();
  const correo = formData.get("correo")?.toString();

  if (!name || !correo) {
    return;
  }

  try {
    await createUser(name, correo);
    redirect("/users"); // Redirige a la página de usuarios
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function removeUser(formData: FormData) {
  const userId = formData.get("userId")?.toString();

  if (!userId) {
    return;
  }

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    revalidatePath("/users"); // Vuelve a validar la página de usuarios
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const correo = formData.get("correo")?.toString();

  if (!id || !name || !correo) {
    return;
  }

  try {
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        correo: correo,
      },
    });

    redirect("/users"); // Redirige a la página de usuarios
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

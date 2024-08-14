"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        correo: email,
      },
    });

    redirect("/users"); // Redirige a la página de usuarios
  } catch (error) {
    console.error("Error creating user:", error);
    // Consider adding error handling here, e.g., sending an error message
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
  const email = formData.get("email")?.toString();

  if (!id || !name || !email) {
    return;
  }

  try {
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        correo: email,
      },
    });

    redirect("/users"); // Redirige a la página de usuarios
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

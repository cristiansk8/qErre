import prisma from "@/lib/prisma";

export async function createUser(name: string, email: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        correo: email,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

'use server';


import prisma from "@/lib/prisma";

export async function songByIdAction(id: string) {
  try {
    const song = await prisma.song.findUnique({
      where: { id : id},
      select: {
        id: true,
        key: true,
        title: true,
        lines: true,
      },
    });

    if (!song) {
      console.warn(`Song with ID "${id}" not found.`);
      return null;
    }

    // Serialize to plain JSON to remove any unserializable parts
    return JSON.parse(JSON.stringify(song));
  } catch (error) {
    console.error("Error in songByIdAction:", error);
    return null;
  }
}

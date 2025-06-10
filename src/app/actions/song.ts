"use server";

import prisma from "../../lib/prisma";

export async function songServerAction() {
  try {
    return await prisma.song.findMany(); // no 'include' needed for JSON fields
  } catch (error) {
    console.error("Error in songServerAction", error);
    return [];
  }
}

"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createProduct(data: FormData) {
  const name = data.get("name") as string
  const price = Number(data.get("price"))

  await prisma.product.create({
    data: {
      name: name,
      price: price
    }
  })

  revalidatePath("/")
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: {
      id: id
    }
  })

  revalidatePath("/")
}
import { prisma } from "../../lib/prisma";
import type { IPatientInput } from "./user.interface.js";
import bcrypt from "bcryptjs";

const createPatient = async (payload: IPatientInput) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        role: "PATIENT",
      },
    });

    const newPatient = await prisma.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
        userId: user.id.toString(),
      },
    });
    return newPatient;
  });
  return result;
};


const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
    },
  });
  return users;
};

export const userService = { createPatient, getAllUsers };

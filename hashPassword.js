// hashPassword.js
import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 12; // højere værdi = mere sikker men langsommere

// Funktion til at hashe et password
export async function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Password must be a non-empty string");
  }
  return await bcryptjs.hash(plainPassword, SALT_ROUNDS);
}

// Funktion til at verificere et password mod en hash
export async function verifyPassword(plainPassword, hashedPassword) {
  return await bcryptjs.compare(plainPassword, hashedPassword);
}

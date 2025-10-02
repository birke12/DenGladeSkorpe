import { hashPassword } from "./hashPassword.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = "mongodb://localhost:27017";
const dbName = "mcd-dengladeskorpe"; // Korrekt database-navn
const adminEmail = "admin@mediacollege.dk";

const run = async () => {
  const newPassword = process.env.ADMIN_PASSWORD;
  if (!newPassword) throw new Error("ADMIN_PASSWORD ikke sat i .env");

  const hashed = await hashPassword(newPassword);
  console.log("Ny hash genereret:", hashed);

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    // Tjek om admin findes
    const adminUser = await users.findOne({ email: adminEmail });
    console.log("Admin fundet:", adminUser);

    if (!adminUser) {
      console.log("Admin-bruger ikke fundet. Tjek email i databasen.");
      return;
    }

    // Opdater password
    const result = await users.updateOne(
      { email: adminEmail },
      { $set: { hashedPassword: hashed } }
    );

    if (result.modifiedCount === 1) {
      console.log("Admin-password opdateret succesfuldt!");
    } else {
      console.log("Hash var allerede den samme.");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

run();
// Kør scriptet med: node updateAdminPassword.js
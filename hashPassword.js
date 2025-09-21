import bcrypt from "bcryptjs";

const password = "admin123"; // jo password aap chahte ho
const hashedPassword = await bcrypt.hash(password, 10);

console.log("Hashed Password:", hashedPassword);

import {
  hashPassword,
  comparePassword,
} from "./utils/password";

async function main() {
  const hash = await hashPassword("Samuel1997");

  console.log(hash);

  const ok = await comparePassword(
    "Samuel1997",
    hash,
  );

  console.log(ok);
}

main();
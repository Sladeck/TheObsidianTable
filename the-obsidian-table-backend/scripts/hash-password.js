import readline from "node:readline";
import bcrypt from "bcryptjs";

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl._writeToOutput = function writeToOutput(stringToWrite) {
      rl.output.write(rl.stdoutMuted ? "*" : stringToWrite);
    };

    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });

    rl.stdoutMuted = true;
  });
}

async function main() {
  const password = await promptHidden("Choose an admin password: ");

  if (!password || password.length < 12) {
    console.error("\nPlease use a password of at least 12 characters.");
    process.exitCode = 1;
    return;
  }

  const confirm = await promptHidden("Confirm the password: ");

  if (confirm !== password) {
    console.error("\nPasswords did not match, nothing was generated.");
    process.exitCode = 1;
    return;
  }

  const hash = await bcrypt.hash(password, 12);

  console.log("\nAdd this line to backend/.env, then restart the server:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

main();

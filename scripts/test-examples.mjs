// This is a script that ensures all of the example repositories build.
// It should loop over all of the examples in the https://github.com/thirdweb-example organization
// For each one, it should clone, build, and run the example without errors.
// If are any errors, it should print the error and exit with a non-zero exit code.
// If there is not an error, delete the example directory and exit with a zero exit code.
import fetch from "node-fetch";
import shell from "shelljs";

var args = process.argv.slice(2);

async function main() {
  console.log(args);

  const reposReq = await fetch(
    "https://api.github.com/orgs/thirdweb-example/repos?per_page=100",
  );

  const repos = await reposReq.json();

  // mkdir new example-tests folder
  shell.mkdir("-p", "example-tests");

  // cd
  shell.cd("example-tests");

  for (const repo of repos) {
    // Testing purposes: only run on next-javascript-starter repo
    if (repo.name !== "next-javascript-starter") {
      continue;
    }

    // Install and build this new version of the react sdk
    shell.exec("npm install");
    shell.exec("npm run build");

    // Git clone the example repo and npm install
    shell.exec(`git clone ${repo.clone_url}`);
    shell.cd(repo.name);
    shell.exec("npm install");

    // Delete the existing / production version of the react SDK from this example's node_modules
    shell.cd("./node_modules");
    shell.rm("-rf", "./@thirdweb-dev/react");

    // Copy the files from the build dist of the react SDK into the example directory
    shell.cd("./@thirdweb-dev/react");
    shell.cp("-R", "../../../dist", ".");
    shell.exec("npm install");

    // cd: back to example base directory
    shell.cd(`../../..`);

    // View the contents of the updated example directory's react SDK installation to confirm we updated it
    const output = shell.cat(
      "./node_modules/@thirdweb-dev/react/dist/index.d.ts",
    );
    console.log(output);

    // Build the example
    shell.exec("npm run build");
  }
}

main();

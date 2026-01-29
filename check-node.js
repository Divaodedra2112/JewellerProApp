const fs = require("node:fs");

// Get the required Node.js version from the .nvmrc file
const requiredVersion = fs.readFileSync(".nvmrc", "utf8").trim();
const currentVersion = process.version;

/**
 * Compares two semantic version strings
 * @param {string} current - Current version (e.g., "v18.0.0")
 * @param {string} required - Required version (e.g., ">=18" or "18.0.0")
 * @returns {boolean} - Whether the current version satisfies the requirement
 */
function isVersionSatisfied(current, required) {
  // Remove 'v' prefix if present
  const cleanCurrent = current.replace(/^v/, "");
  const cleanRequired = required.replace(/^v/, "");

  // Parse current version
  const [currentMajor, currentMinor = 0, currentPatch = 0] = cleanCurrent
    .split(".")
    .map(Number);

  // Handle >= requirement
  if (cleanRequired.startsWith(">=")) {
    const minVersion = cleanRequired.substring(2);
    const [requiredMajor, requiredMinor = 0, requiredPatch = 0] = minVersion
      .split(".")
      .map(Number);

    if (currentMajor > requiredMajor) return true;
    if (currentMajor < requiredMajor) return false;
    if (currentMinor > requiredMinor) return true;
    if (currentMinor < requiredMinor) return false;
    return currentPatch >= requiredPatch;
  }

  // Handle exact version match
  const [requiredMajor, requiredMinor = 0, requiredPatch = 0] = cleanRequired
    .split(".")
    .map(Number);

  return (
    currentMajor === requiredMajor &&
    currentMinor === requiredMinor &&
    currentPatch === requiredPatch
  );
}

try {
  const isSatisfied = isVersionSatisfied(currentVersion, requiredVersion);

  if (isSatisfied) {
    console.warn(`✅ Node.js version ${currentVersion} is correct.`);
  } else {
    console.error(
      `\n❌ You are using Node.js version ${currentVersion}, but the required version is ${requiredVersion}.\n`
    );
    console.error(
      `Please run the following command to switch to the correct Node.js version:\n\n   nvm use`
    );
    process.exit(1);
  }
} catch (error) {
  console.error("Error occurred while checking Node.js version:", error);
  process.exit(1);
}

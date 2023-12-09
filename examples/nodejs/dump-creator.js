const { exec } = require("child_process");
const dotenv = require("dotenv");
dotenv.config();

const atlasConnectionString = process.env.MONGO_ATLAS_URI;
const dbName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION_NAME;
const dumpDir = process.env.MONGO_DUMP_DIR;

const twentyFourHoursAgo = new Date();
twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

const command = `mongodump --uri="${atlasConnectionString}" --db=${dbName} --collection=${collectionName} --query '{"createdAt": {"$gte": {"$date": "${twentyFourHoursAgo.toISOString()}"}}}' --out=${dumpDir}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

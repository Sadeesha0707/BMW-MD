const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtpeVFXYlhwODdlS0NVNHhqVXozTnRzNjZsOVYxSi9UL3Y0MS9rS0oybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmthQ1pFKzNNaVJ4QjhsTjBIOHhMRXNLSzVZaFhValQwN2h4clptZTBVST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TjFvdGNGRlg3Ylp4eDg0R0VPWHE3TFE4VHpNcjljdk4vV2ZGTk80Z0g4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxbWJXZU1Jc2o1aldPSTA3Vkx5WitLL2pnaXE2RFhWOG4vcUlVb1haNlN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldPQ1dObGdZZ2V4YTRBOWN6WHgrNEI0Z2hrTCtvTEQ5MFJnOXJtaFpiWGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im43QWFxMTNkSWVQUndIdlJYWXhWM1QrSkxBRzAyLzVrWXVKd2JlU2dqU2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0V4YURtemJDb0ZOZThTVHlNcnB3Sk1sSWVKeElEdDE0TUVKdStDSUoxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3N5SmJvc2d6RzB2Y1BHRkxDM0FteGJsOVljcFB6cE5aNVpHM2NPREdsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllVZ1IzV2NYWlRUK29KcEVSbnh5VWNIVFlsQWt2cEVsMmJrRE1EVERxdFFWaXhpV1VDTE9jUUlFR2ZkMkpqeFdIVVFYY0wrSi9zSnBKU1VKVnJORURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk4LCJhZHZTZWNyZXRLZXkiOiIvNzFTQ0JVQWpFbnNEVmUyTElkd2pmUmhhb2VjS0w4NVR0V0lhWEliY0VVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJwaDR5S1p3RlJFcTAwTEFneFpkb3NRIiwicGhvbmVJZCI6IjQyZTAxYjA2LWQ0NzEtNGUzNi05MTQ2LWViNTQxNWYxOTA0YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqRnhWRTFXYjNWWEgzZiswY2RnNzZwMDNFc1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHIyREg2OFlocjN2Zk8vSk5ZQW9WNWFNZXZRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE5WEU1MU5RIiwibWUiOnsiaWQiOiI5NDcyNDU3NTgzMjoxNEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUEhwenRnRUVLU1NocllHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYXh6RTBvTXlRbk12bitrdUtvdC9QVE9TcHVIeXdzY3VWeFZNVmd2Qi9qST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY3lVK0tzR3JwSTJVM08zanYxTkRia3JRVGl3c3cxOFc0UDBHYnpMaWpiWDZQcWMzLzBlWndxR2RORkFqb2Z3L0NPczE1MW1uRzUzNXZ3WC9zelZNQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9UREc5Q1c1blZzSnhSWVR0ak01NlYzbWMyb0hTK0ZndEhBc0FpZlZyWlYzVTNhZS9vOXVoQmU1NE1uYnVzeW9kcWNVY0N4TldYTzRsNGIyQ25oekN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjQ1NzU4MzI6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV3NjeE5LRE1rSnpMNS9wTGlxTGZ6MHprcWJoOHNMSExsY1ZURllMd2Y0eSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzk1OTYwMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFeGUifQ== '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Sadeesha",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

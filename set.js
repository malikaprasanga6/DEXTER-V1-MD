const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEdxNVJvTlhkTGZleWYrQ2FVNHBsR2JmakN3cEp6Z0ZDMDJSMTRSTnRXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3hNWUd5N1U1RmYxczJvNE9reHF1MU1KR01kdlVOWWxrOVJXc1VsdjBGND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTWlMTWFYdFpxcCtSWk1jS1JFSWJHcndmUFJ5a0ZoNVdvWWRacGRrR1ZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4Z1dIUnFGQzhnZFBlVSswaE5EdHdFWVZFZUtqdUpJOWNaRXR2SmdQWlRzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktNUWdBWmtmczhsTVBUa3NTSVlsYkRNaUdmVUdQdHhxMXM3ZVBtUldhWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ4MHdiV2Z1cG5kbElqSGNxeExWZW5weG1BaTVxc0VkbUpla081c0V0VnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU9JSHZ2S0FJNmozVk8zdlBzVHVDNVlMd2xGN1hQZFdJa2hJb3F2S2ZsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkdlaTlMdzhLS2tYOFJqR01mRWU5UjNobDR5UjVDeWN2OVdER0RRTW9Saz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ1MEdZTGlmYmNhaU50bm5SWCtjQ0NqTENLajh2eXNDMFVOaEppRDc5dnh3TCtMNk81cVB0UEVXTzFKYSs0emJLb2dLc0ttdWxwMTc3Q000U3l0WWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6IlJiRFp5UnZSVXI2alhUNlRqMSt5bVlnVkFXb3dsK3pvcnNxMCszcm5aZmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InlaX1JnblctUU82RUU2ZjByUDJuZEEiLCJwaG9uZUlkIjoiNGFhYmI4NTUtZjgyMS00MWM4LTgwOWQtMGE2ODEwZGE4OTNhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InEyTlJCSzRQc1B3cm81Z2ZVUGdHdWIvWHZZYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVcFE4ZThIVEFpS0VqWCtKcFRYcnZVekRvZ0E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMzRENjZUMjgiLCJtZSI6eyJpZCI6Ijk0Nzc2OTM4MDA5OjU5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNIQUxBSCBNRCBWMiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJTMHNFQkVKVGloYnNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaHlna284MUFBNGdSQzlxZFdoVndHWGt5bmZ1VmVpQ3hMUCtjcHNqS3UxVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiamR5QXlsM3JSNmNDT1R6V3JkWjNGL0V0ME1mSDU1T2RvLzdEUHdxekVSeTY2YkxlZjQ4cnNuZk1IdlNjRjhIdlZPUnZrWE9sRWI1VG93ZVZrdDFnQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6InlGMWpsLzlxYWxqOWdtNzhkakVPUmFUYlhGbmZYTkZBVmtHUXR6bVNvT0dGUzFxNzhHTlMwQWdCNE9qR29KSkxTU2dqUlNhWUdyRmdSWGdFcUgybGdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzY5MzgwMDk6NTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWWNvSktQTlFBT0lFUXZhblZvVmNCbDVNcDM3bFhvZ3NTei9uS2JJeXJ0ViJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDQzOTIwMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQRVEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  dexter  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94776938009",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

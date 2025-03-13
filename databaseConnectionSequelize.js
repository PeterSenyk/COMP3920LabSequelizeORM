require('dotenv').config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_NAME) {
    console.error("⚠️ Missing database environment variables! Check your .env file.");
    process.exit(1); // Stop execution if variables are missing
}

const dbConfigLocal = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?timezone=Z`;

console.log("✅ Database connection string loaded:", dbConfigLocal); // Debugging

module.exports = dbConfigLocal;

import dotenv from "dotenv";
dotenv.config();

const variable = {
    jwtKey: process.env.JWT_SECRET_KEY,
    pepper: process.env.PEPPER,
    connectionString: process.env.MONGO_DB_CONN_STRING,
};

export default variable;

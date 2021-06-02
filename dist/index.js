"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rdb_query_class_1 = require("./src/classes/rdb-query.class");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const db = rdb_query_class_1.EasySQL.init({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
const query = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = {
        action: 'SELECT',
        columns: 'emp_name',
        tables: 'emp',
        orderBy: [{ param: 'emp_name', order: 'DESC' }]
    };
    const giveResult = (yield db.simpleQuery.simpleQuery(sqlQuery).execute()).rows;
    console.log(giveResult);
});
query();
/*
CREATE TABLE emp (
    emp_id int PRIMARY KEY,
    dept_id int REFERENCES dept(dept_id),
    emp_name VARCHAR(150)
);

CREATE TABLE dept (
    dept_id int PRIMARY KEY,
    dept_name VARCHAR(150)
);
*/
//# sourceMappingURL=index.js.map
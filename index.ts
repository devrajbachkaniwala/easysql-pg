import { EasySQL, SQLQuery } from './src/classes/rdb-query.class';
import { config } from 'dotenv';

config();

const db = EasySQL.init({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: (process.env.DB_PORT as any) as number
});

const query = async () => {
    const sqlQuery: SQLQuery = {
        action: 'SELECT',
        columns: 'emp_name',
        tables: 'emp',
        orderBy: [ { param: 'emp_name', order: 'DESC' } ]
    };
    const giveResult = (await db.simpleQuery.simpleQuery(sqlQuery).execute()).rows ;
    console.log(giveResult);
}

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

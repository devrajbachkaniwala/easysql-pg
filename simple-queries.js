const EasySQL = require('./dist/src/classes/rdb-query.class').EasySQL;
const dotenv = require('dotenv');

dotenv.config();

const db = EasySQL.init({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT
});

const insert = () => {
    const query = {
        action: 'INSERT',
        tables: 'emp',
        data: {
            emp_id: 7,
            dept_id: null,
            emp_name: 'Stefan'
        }
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const update = () => {
    const query = {
        action: 'UPDATE',
        tables: 'emp',
        data: {
            emp_name: 'Charlie'
        },
        where: [{ field: 'emp_name', condition: '=', value: 'Stefan' }]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const remove = () => {
    const query = {
        action: 'DELETE',
        tables: 'emp',
        where: [{ field: 'emp_id', condition: '=', value: 7 }]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const readAll = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'dept'
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereEqualTo = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '=', value: 1 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereNotEqualTo = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '!=', value: 1 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereGreaterThan = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '>', value: 5 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereGreaterThanEqualTo = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '>=', value: 5 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereLessThan = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '<', value: 5 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereLessThanEqualTo = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: '<=', value: 5 } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereLike = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'LIKE', value: 'D%' } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereILike = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'ILIKE', value: 'D%' } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereNotLike = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'NOT LIKE', value: 'D%' } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereNotILike = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'NOT ILIKE', value: 'D%' } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereIN = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'IN', value: [ 'Lexi', 'Ben' ] } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereNotIN = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_name', condition: 'NOT IN', value: [ 'Lexi', 'Ben' ] } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereBetween = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: 'BETWEEN', value: [ 1, 5 ] } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereNotBetween = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'emp_id', condition: 'NOT BETWEEN', value: [ 1, 5 ] } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const groupBy = () => {
    const query = {
        action: 'SELECT',
        columns: [ 'count(emp_id) as total', 'dept_id' ],
        tables: 'emp',
        groupBy: [ 'dept_id' ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const having = () => {
    const query = {
        action: 'SELECT',
        columns: [ 'count(emp_id) as total', 'dept_id' ],
        tables: 'emp',
        groupBy: 'dept_id',
        having: { param: 'count(emp_id)', condition: '>', value: 3 }
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const orderBy = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        orderBy: [ { param: 'emp_name', order: 'ASC' } ]
    }
    return db.simpleQuery.simpleQuery(query).execute();
}

const whereIsNull = () => {
    const query = {
        action: 'SELECT',
        columns: '*',
        tables: 'emp',
        where: [ { field: 'dept_id', condition: 'IS NULL' } ]
    }
}

module.exports = { readAll, insert, update, remove, whereEqualTo, whereNotEqualTo, whereGreaterThan, whereGreaterThanEqualTo, whereLessThan, whereLessThanEqualTo, whereLike, whereILike, whereNotLike, whereNotILike, whereIN, whereNotIN, whereBetween, whereNotBetween, groupBy, having, orderBy };
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
  return db.write.table('emp').insert({ emp_id: 7, dept_id: null, emp_name: 'Stefan' }).execute();
}

const update = () => {
  return db.update.table('emp').update({ emp_name: 'Charlie' }).where('emp_name', '=', 'Stefan').execute();
}

const remove = () => {
  return db.delete.table('emp').where('emp_id', '=', 7).delete();
}

const readAll = () => {
  return db.read.columns('*').tables('dept').get();
}

const whereEqualTo = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '=', 1).get();
}

const whereNotEqualTo = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '!=', 1).get();
}

const whereGreaterThan = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '>', 5).get();
}

const whereGreaterThanEqualTo = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '>=', 5).get();
}

const whereLessThan = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '<', 5).get();
}

const whereLessThanEqualTo = () => {
  return db.read.columns('*').tables('emp').where('emp_id', '<=', 5).get();
}

const whereLike = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'LIKE', 'D%').get();
}

const whereILike = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'ILIKE', 'D%').get();
}

const whereNotLike = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'NOT LIKE', 'D%').get();
}

const whereNotILike = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'NOT ILIKE', 'D%').get();
}

const whereIN = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'IN', ['Lexi', 'Ben']).get();
}

const whereNotIN = () => {
  return db.read.columns('*').tables('emp').where('emp_name', 'NOT IN', ['Lexi', 'Ben']).get();
}

const whereBetween = () => {
  return db.read.columns('*').tables('emp').where('emp_id', 'BETWEEN', [1, 5]).get();
}

const whereNotBetween = () => {
  return db.read.columns('*').tables('emp').where('emp_id', 'NOT BETWEEN', [1, 5]).get();
}

const groupBy = () => {
  return db.read.columns(['count(emp_id) as total', 'dept_id']).tables('emp').groupBy('dept_id').get();
}

const having = () => {
  return db.read.columns(['count(emp_id) as total', 'dept_id']).tables('emp').groupBy('dept_id').having('count(emp_id)', '>', 3).get();
}

const orderBy = () => {
  return db.read.columns('*').tables('emp').orderBy('emp_name', 'ASC').get();
}

const whereIsNull = () => {
  return db.read.columns('*').tables('emp').where('dept_id', 'IS NULL').get();
}

const whereIsNotNull = () => {
  return db.read.columns('*').tables('emp').where('dept_id', 'IS NOT NULL').get();
}

const innerJoin = () => {
  return db.read.columns([ 'emp_id', 'dept.dept_id', 'emp_name', 'dept_name' ]).tables('emp').join('INNER JOIN', 'dept', [ 'emp.dept_id', 'dept.dept_id' ]).orderBy('emp_id', 'ASC').get();
}

const leftJoin = () => {
  return db.read.columns([ 'emp_id', 'dept.dept_id', 'emp_name', 'dept_name' ]).tables('emp').join('LEFT JOIN', 'dept', [ 'emp.dept_id', 'dept.dept_id' ]).orderBy('emp_id', 'ASC').get();
}

const rightJoin = () => {
  return db.read.columns([ 'emp_id', 'dept.dept_id', 'emp_name', 'dept_name' ]).tables('emp').join('RIGHT JOIN', 'dept', [ 'emp.dept_id', 'dept.dept_id' ]).orderBy('emp_id', 'ASC').get();
}

const fullJoin = () => {
  return db.read.columns([ 'emp_id', 'dept.dept_id', 'emp_name', 'dept_name' ]).tables('emp').join('FULL JOIN', 'dept', [ 'emp.dept_id', 'dept.dept_id' ]).orderBy('emp_id', 'ASC').get();
}

module.exports = { whereEqualTo, whereNotEqualTo, whereGreaterThan, whereGreaterThanEqualTo, whereLessThan, whereLessThanEqualTo, readAll, insert, update, remove, whereLike, whereILike, whereNotLike, whereNotILike, whereIN, whereNotIN, whereBetween, whereNotBetween, whereIsNull, whereIsNotNull, groupBy, having, orderBy, innerJoin, leftJoin, rightJoin, fullJoin };

/* async function test() {
  const result = (await rightJoin()).rows;
  console.log(result);
}

test(); */
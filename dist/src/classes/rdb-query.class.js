"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasySQL = exports.SimpleQuery = exports.DeleteQuery = exports.UpdateQuery = exports.WriteQuery = exports.ReadQuery = void 0;
const pg_1 = require("pg");
class RDBQuery {
    constructor(action, config) {
        this.__action = 'SELECT';
        this.__columns = '';
        this.__tables = '';
        this.__where = '';
        this.__set = '';
        this.__newValues = '';
        this.__clause = '';
        this.__orderBy = '';
        this.__groupBy = '';
        this.__having = '';
        this.__join = '';
        this.__whereParams = [];
        this.__action = action;
        this.__config = config;
    }
    get query() {
        let fullQuery = '';
        if (this.__action == 'INSERT') {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery += this.__tables;
            fullQuery += this.__columns;
            fullQuery += this.__newValues + ';';
        }
        else {
            fullQuery += this.__action;
            fullQuery += this.__clause;
            fullQuery += this.__columns;
            fullQuery += this.__tables;
            fullQuery += this.__set;
            fullQuery += this.__join;
            fullQuery += this.__where;
            fullQuery += this.__groupBy;
            fullQuery += this.__having;
            fullQuery += this.__orderBy;
        }
        return { query: fullQuery, params: this.__whereParams };
    }
    // execute the query
    _execute() {
        const pool = new pg_1.Pool(this.__config);
        return pool.query(this.query.query, this.query.params);
    }
    // giving necessary condition
    _where(param, condition, value = null, isOr = false) {
        if (this.__where.length > 0) {
            this.__where += isOr ? ' OR ' : ' AND ';
        }
        (this.__where.length == 0) ? this.__where += ' WHERE ' : this.__where += '';
        if (value == null) {
            if (!(condition == 'IS NULL' || condition == 'IS NOT NULL')) {
                throw new Error('Value should not be empty');
            }
        }
        if (condition == 'IS NULL' || condition == 'IS NOT NULL') {
            (condition == 'IS NULL') ? this.__where += `${param} ${condition}` : this.__where += `${param} ${condition}`;
        }
        else if (condition == 'BETWEEN' || condition == 'NOT BETWEEN' || condition == 'IN' || condition == 'NOT IN') {
            if (condition == 'BETWEEN' || condition == 'NOT BETWEEN') {
                if (typeof value == 'object') {
                    if (value.length == 2) {
                        this.__whereParams.push(value.shift());
                        this.__whereParams.push(value.shift());
                    }
                    else if (value.length == 0) {
                        throw new Error('Value should contain two values');
                    }
                    else if (value.length > 2) {
                        throw new Error('Value should contain only two values');
                    }
                }
                console.log(this.__whereParams);
                (condition == 'BETWEEN') ? this.__where += `${param} ${condition} $${this.__whereParams.length - 1} AND $${this.__whereParams.length}` : '';
                (condition == 'NOT BETWEEN') ? this.__where += `${param} ${condition} $${this.__whereParams.length - 1} AND $${this.__whereParams.length}` : '';
            }
            if (condition == 'IN' || condition == 'NOT IN') {
                if (typeof value == 'object') {
                    if (value.length == 0) {
                        throw new Error('Value should contain at least one value');
                    }
                    while (value.length != 0) {
                        this.__whereParams.push(value.shift());
                    }
                }
                else {
                    value = [value];
                    this.__whereParams.push(value.shift());
                }
                if (condition == 'IN') {
                    if (typeof value == 'object') {
                        let index = this.__whereParams.map((val, i) => i += 1);
                        let inQuery = `( $${index.join(', $')} ) `;
                        this.__where += `${param} ${condition} ${inQuery}`;
                    }
                }
                if (condition == 'NOT IN') {
                    if (typeof value == 'object') {
                        let index = this.__whereParams.map((val, i) => i += 1);
                        let inQuery = ` ( $${index.join(', $')} ) `;
                        this.__where += `${param} ${condition} ${inQuery}`;
                    }
                }
            }
        }
        else if (condition == '=' && typeof value == 'string' && value.includes('.')) {
            this.__where += `${param} ${condition} ${value}`;
        }
        else if (condition == '=' && typeof value == 'object' && value.length == 1 && value.map(item => (typeof item == 'string') ? (item.includes('.')) ? true : false : false)) {
            this.__where += `${param} ${condition} ${value.map(item => item)}`;
        }
        else {
            if (typeof value == 'object') {
                if (value.length == 1) {
                    this.__whereParams.push(value.shift());
                }
                else if (value.length == 0) {
                    throw new Error('Value should contain one value');
                }
                else if (value.length > 1) {
                    throw new Error('Value should contain only one value');
                }
            }
            else {
                this.__whereParams.push(value);
            }
            this.__where += `${param} ${condition} $${this.__whereParams.length}`;
        }
        return this;
    }
    //which query we want to execute
    _action(action) {
        this.__action = action;
        if (this.__action == 'DELETE' || this.__action == 'INSERT') {
            (this.__action == 'DELETE') ? this.__clause += ' FROM ' : this.__clause += ' INTO ';
        }
        return this;
    }
    //giving array of columns
    _columns(params) {
        if (typeof params == 'string') {
            params = [params];
        }
        if (this.__action == 'INSERT') {
            this.__columns += '(' + params.join(', ') + ') ';
        }
        else {
            this.__columns += ' ' + params.join(', ') + ' FROM';
        }
        return this;
    }
    //giving array of tables
    _tables(params) {
        if (typeof params == 'string') {
            params = [params];
        }
        if (this.__action == 'INSERT') {
            this.__tables += params.join(' ');
        }
        else {
            this.__tables += ' ' + params.join(', ');
        }
        return this;
    }
    //updating and setting the new value to the column
    _set(param, value) {
        (this.__set.length == 0) ? this.__set += ' SET ' : this.__set += ', ';
        this.__whereParams.push(value);
        this.__set += `${param} = $${this.__whereParams.length}`;
        return this;
    }
    //insert new values in the table
    _newValues(params) {
        while (params.length != 0) {
            this.__whereParams.push(params.shift());
        }
        let index = this.__whereParams.map((val, i) => i += 1);
        this.__newValues += ` VALUES( $${index.join(', $')} )`;
        return this;
    }
    //performing asc and desc according to columns
    _orderBy(param, order) {
        (this.__orderBy.length == 0) ? this.__orderBy += ' ORDER BY ' : this.__orderBy += ', ';
        this.__orderBy += `${param} ${order}`;
        return this;
    }
    //grouping columns
    _groupBy(params) {
        if (typeof params == 'string') {
            params = [params];
        }
        this.__groupBy += ` GROUP BY ${params.join(',')} `;
        return this;
    }
    //grouping column's condition
    _having(param, condition, value) {
        this.__whereParams.push(value);
        this.__having += ` HAVING ${param} ${condition} $${this.__whereParams.length} `;
        return this;
    }
    //joining tables
    _join(condition, table2, on) {
        if (on.length == 0) {
            throw new Error('Join table ON should not be empty');
        }
        else if (on.length > 2) {
            throw new Error('Join table ON should contain only two values');
        }
        this.__join += ` ${condition} ${table2} ON (${on[0]} = ${on[1]}) `;
        return this;
    }
    _simpleQuery(sql) {
        if (sql.action == 'SELECT') {
            this._action(sql.action);
            this._columns(sql.columns);
            this._tables(sql.tables);
            if (sql.join) {
                sql.join.forEach(item => {
                    this._join(item.condition, item.table2, item.on);
                });
            }
            if (sql.where) {
                sql.where.forEach(item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                });
            }
            if (sql.groupBy) {
                this._groupBy(sql.groupBy);
            }
            if (sql.having) {
                this._having(sql.having.param, sql.having.condition, sql.having.value);
            }
            if (sql.orderBy) {
                sql.orderBy.forEach(item => {
                    this._orderBy(item.param, item.order);
                });
            }
        }
        else if (sql.action == 'INSERT') {
            this._action('INSERT');
            this._tables(sql.tables);
            if (sql.data) {
                let cols = [];
                let values = [];
                for (let key of Object.keys(sql.data)) {
                    cols.push(key);
                    values.push(sql.data[key]);
                }
                this._columns(cols);
                this._newValues(values);
            }
            else if (sql.newValues) {
                (sql.columns) ? this._columns(sql.columns) : '';
                this._newValues(sql.newValues);
            }
        }
        else if (sql.action == 'UPDATE') {
            this._action('UPDATE');
            this._tables(sql.tables);
            if (sql.data) {
                for (let key of Object.keys(sql.data)) {
                    this._set(key, sql.data[key]);
                }
            }
            if (sql.where) {
                sql.where.forEach(item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                });
            }
        }
        else if (sql.action == 'DELETE') {
            this._action('DELETE');
            this._tables(sql.tables);
            if (sql.where) {
                sql.where.forEach(item => {
                    const isOr = (item.type == 'OR WHERE') ? true : false;
                    this._where(item.field, item.condition, item.value, isOr);
                });
            }
        }
    }
}
class ReadQuery extends RDBQuery {
    constructor(action = 'SELECT', config) {
        super(action, config);
    }
    static instance() {
        return new ReadQuery();
    }
    columns(params) {
        this._columns(params);
        return this;
    }
    tables(params) {
        this._tables(params);
        return this;
    }
    join(condition, table2, on) {
        this._join(condition, table2, on);
        return this;
    }
    where(param, condition, value, isOr) {
        this._where(param, condition, value, isOr);
        return this;
    }
    groupBy(params) {
        this._groupBy(params);
        return this;
    }
    having(param, condition, value) {
        this._having(param, condition, value);
        return this;
    }
    orderBy(param, order) {
        this._orderBy(param, order);
        return this;
    }
    get() {
        return this._execute();
    }
}
exports.ReadQuery = ReadQuery;
class WriteQuery extends RDBQuery {
    constructor(action = 'INSERT', config) {
        super(action, config);
    }
    static get instance() {
        return new WriteQuery();
    }
    table(param) {
        this._tables(param);
        return this;
    }
    insert(data) {
        let cols = [];
        let values = [];
        for (let key of Object.keys(data)) {
            cols.push(key);
            values.push(data[key]);
        }
        this._action('INSERT');
        this._columns(cols);
        this._newValues(values);
        return this;
    }
    execute() {
        return this._execute();
    }
}
exports.WriteQuery = WriteQuery;
class UpdateQuery extends RDBQuery {
    constructor(action = 'UPDATE', config) {
        super(action, config);
    }
    static get instance() {
        return new UpdateQuery();
    }
    table(param) {
        this._tables(param);
        return this;
    }
    update(data) {
        this._action('UPDATE');
        for (let key of Object.keys(data)) {
            this._set(key, data[key]);
        }
        return this;
    }
    where(param, condition, value, isOr) {
        this._where(param, condition, value, isOr);
        return this;
    }
    execute() {
        return this._execute();
    }
}
exports.UpdateQuery = UpdateQuery;
class DeleteQuery extends RDBQuery {
    constructor(action = 'DELETE', config) {
        super(action, config);
    }
    static get instance() {
        return new DeleteQuery();
    }
    table(param) {
        this._action('DELETE');
        this._tables(param);
        return this;
    }
    where(param, condition, value, isOr) {
        this._where(param, condition, value, isOr);
        return this;
    }
    delete() {
        return this._execute();
    }
}
exports.DeleteQuery = DeleteQuery;
class SimpleQuery extends RDBQuery {
    constructor(action = 'SELECT', config) {
        super(action, config);
    }
    simpleQuery(sql) {
        this._simpleQuery(sql);
        return this;
    }
    execute() {
        return this._execute();
    }
}
exports.SimpleQuery = SimpleQuery;
class EasySQL {
    constructor(config) {
        this.__config = config;
    }
    static init(config) {
        return new EasySQL(config);
    }
    get read() {
        return new ReadQuery('SELECT', this.__config);
    }
    get write() {
        return new WriteQuery('INSERT', this.__config);
    }
    get update() {
        return new UpdateQuery('UPDATE', this.__config);
    }
    get delete() {
        return new DeleteQuery('DELETE', this.__config);
    }
    get simpleQuery() {
        return new SimpleQuery('SELECT', this.__config);
    }
}
exports.EasySQL = EasySQL;
//# sourceMappingURL=rdb-query.class.js.map
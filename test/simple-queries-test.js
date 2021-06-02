const assert = require('chai').assert;
const simpleQueries = require('../simple-queries');

describe('Simple Queries ', () => {
    it('Read All result', async () => {
        const actualResult = (await simpleQueries.readAll()).rows;
        const expectedResult = [{
            dept_id: 1,
            dept_name: 'Accounts'
        }, {
            dept_id: 2,
            dept_name: 'IT'
        }, {
            dept_id: 3,
            dept_name: 'HR'
        }];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Insert result ', async () => {
        const actualResult = (await simpleQueries.insert()).rowCount;
        const expectedResult = 1;
        assert.equal(actualResult, expectedResult);
    });

    it('Update result ', async () => {
        const actualResult = (await simpleQueries.update()).rowCount;
        const expectedResult = 1;
        assert.equal(actualResult, expectedResult);
    });

    it('Delete result ', async () => {
        const actualResult = (await simpleQueries.remove()).rowCount;
        const expectedResult = 1;
        assert.equal(actualResult, expectedResult);
    });

    it('Where Equal To result ', async () => {
        const actualResult = (await simpleQueries.whereEqualTo()).rows;
        const expectedResult = [{
            emp_id: 1,
            dept_id: 1,
            emp_name: 'Lexi'
        }];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where NOT EQUAL TO result', async () => {
        const actualResult = (await simpleQueries.whereNotEqualTo()).rows;
        const expectedResult = [
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' },
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where GREATER THAN result', async () => {
        const actualResult = (await simpleQueries.whereGreaterThan()).rows;
        const expectedResult = [
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where GREATER THAN OR EQUAL TO result', async () => {
        const actualResult = (await simpleQueries.whereGreaterThanEqualTo()).rows;
        const expectedResult = [
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' },
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where LESS THAN result', async () => {
        const actualResult = (await simpleQueries.whereLessThan()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where LESS THAN OR EQUAL TO result', async () => {
        const actualResult = (await simpleQueries.whereLessThanEqualTo()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where Like result', async () => {
        const actualResult = (await simpleQueries.whereLike()).rows;
        const expectedResult = [{
            emp_id: 5,
            dept_id: 2,
            emp_name: 'Dom'
        }, {
            emp_id: 6,
            dept_id: 2,
            emp_name: 'Damon'
        }];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where ILike result', async () => {
        const actualResult = (await simpleQueries.whereILike()).rows;
        const expectedResult = [{
            emp_id: 5,
            dept_id: 2,
            emp_name: 'Dom'
        }, {
            emp_id: 6,
            dept_id: 2,
            emp_name: 'Damon'
        }, {
            emp_id: 13,
            dept_id: null,
            emp_name: 'decker'
        }];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where Not Like result', async () => {
        const actualResult = (await simpleQueries.whereNotLike()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where Not ILike result', async () => {
        const actualResult = (await simpleQueries.whereNotILike()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where IN result', async () => {
        const actualResult = (await simpleQueries.whereIN()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where NOT IN result', async () => {
        const actualResult = (await simpleQueries.whereNotIN()).rows;
        const expectedResult = [
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' },
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where BETWEEN result', async () => {
        const actualResult = (await simpleQueries.whereBetween()).rows;
        const expectedResult = [
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('Where NOT BETWEEN result', async () => {
        const actualResult = (await simpleQueries.whereNotBetween()).rows;
        const expectedResult = [
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('GROUP BY result', async () => {
        const actualResult = (await simpleQueries.groupBy()).rows;
        const expectedResult = [
            { total: '4', dept_id: null },
            { total: '5', dept_id: 1 },
            { total: '3', dept_id: 2 }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('HAVING result', async () => {
        const actualResult = (await simpleQueries.having()).rows;
        const expectedResult = [
            { total: '4', dept_id: null },
            { total: '5', dept_id: 1 }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });

    it('ORDER BY result', async () => {
        const actualResult = (await simpleQueries.orderBy()).rows;
        const expectedResult = [
            { emp_id: 2, dept_id: 2, emp_name: 'Ben' },
            { emp_id: 11, dept_id: 1, emp_name: 'Charles' },
            { emp_id: 6, dept_id: 2, emp_name: 'Damon' },
            { emp_id: 13, dept_id: null, emp_name: 'decker' },
            { emp_id: 5, dept_id: 2, emp_name: 'Dom' },
            { emp_id: 10, dept_id: 1, emp_name: 'James' },
            { emp_id: 4, dept_id: null, emp_name: 'Jeremy' },
            { emp_id: 8, dept_id: null, emp_name: 'Klaus' },
            { emp_id: 12, dept_id: 1, emp_name: 'Kylie' },
            { emp_id: 1, dept_id: 1, emp_name: 'Lexi' },
            { emp_id: 9, dept_id: 1, emp_name: 'Michael' },
            { emp_id: 3, dept_id: null, emp_name: 'Sam' }
        ];
        assert.deepEqual(actualResult, expectedResult);
    });
});
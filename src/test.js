"use strict";
const program = require('commander');
const MongoService = require('./services/mongdb');
const PostgreService = require('./services/postgre');
const TestInsert = require('./tests/test-insert');
const TestSelect = require('./tests/test-select');
const TestUpdate = require('./tests/test-update');
const TestAggregation = require('./tests/test-aggregation');
const TestSelectLike = require('./tests/test-select-like');
const TestDelete = require('./tests/test-delete');
const TestRange = require('./tests/test-range');

const SMALL = 200;
const MEDIUM = 20000;
const LARGE = 200000;
const ITERATIONS = 10;
const UPDATE_NESTING = 5;

program
    .command('insert')
    .description('Test insert queries')
    .action(async () => {
        const test = new TestInsert();
        let result = {};
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, ITERATIONS);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, ITERATIONS);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, ITERATIONS);
        console.log(result);
        process.exit();
    });

program
    .command('select')
    .description('Test select queries')
    .action(async () => {
        const test = new TestSelect();
        let result = {};
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, ITERATIONS);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, ITERATIONS);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, ITERATIONS);
        console.log(result);
        process.exit();
    });

program
    .command('select-like')
    .description('Test select plain like')
    .action(async () => {
        const test = new TestSelectLike();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, ITERATIONS, false);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, ITERATIONS, false);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, ITERATIONS, false);
        console.log(result);
        process.exit();
    });

program
    .command('select-like-index')
    .description('Test select like with index')
    .action(async () => {
        const test = new TestSelectLike();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, ITERATIONS, true);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, ITERATIONS, true);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, ITERATIONS, true);
        console.log(result);
        process.exit();
    });

program
    .command('update-partial')
    .description('Test partial update')
    .action(async () => {
        const test = new TestUpdate();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, 0, ITERATIONS, true);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, 0, ITERATIONS, true);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, 0, ITERATIONS, true);
        console.log(result);
        process.exit();
    });

program
    .command('update-partial-nest')
    .description('Test partial update with nesting')
    .action(async () => {
        const test = new TestUpdate();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, UPDATE_NESTING, ITERATIONS, true);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, UPDATE_NESTING, ITERATIONS, true);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, UPDATE_NESTING, ITERATIONS, true);
        console.log(result);
        process.exit();
    });

program
    .command('update-full')
    .description('Test full update')
    .action(async () => {
        const test = new TestUpdate();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, 0, ITERATIONS, false);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, 0, ITERATIONS, false);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, 0, ITERATIONS, false);
        console.log(result);
        process.exit();
    });

program
    .command('update-full-nest')
    .description('Test full update with nesting')
    .action(async () => {
        const test = new TestUpdate();
        let result = [];
        console.log("Testing small data..");
        result["small"] = await test.runTest(SMALL, UPDATE_NESTING, ITERATIONS, false);
        console.log("Testing medium data..");
        result["medium"] = await test.runTest(MEDIUM, UPDATE_NESTING, ITERATIONS, false);
        console.log("Testing large data..");
        result["large"] = await test.runTest(LARGE, UPDATE_NESTING, ITERATIONS, false);
        console.log(result);
        process.exit();
    });

program
    .command('aggregation')
    .description('Test plain aggregation')
    .action(async () => {
            const test = new TestAggregation();
            let result = [];
            console.log("Testing small data..");
            result["small"] = await test.runTest(SMALL, ITERATIONS);
            console.log("Testing medium data..");
            result["medium"] = await test.runTest(MEDIUM, ITERATIONS);
            console.log("Testing large data..");
            result["large"] = await test.runTest(LARGE, ITERATIONS);
            console.log(result);
            process.exit();
    });
    
    
    program
            .command('delete')
            .description('Test delete')
            .action(async () => {
                const test = new TestDelete();
                let result = [];
                console.log("Testing small data..");
                result["small"] = await test.runTest(SMALL, ITERATIONS,false);
                console.log("Testing medium data..");
                result["medium"] = await test.runTest(MEDIUM, ITERATIONS,false);
                console.log("Testing large data..");
                result["large"] = await test.runTest(LARGE, ITERATIONS,false);
                console.log(result);
                process.exit();
    });
    
        program
            .command('delete-index')
            .description('Test delete using index')
            .action(async () => {
                const test = new TestDelete();
                let result = [];
                console.log("Testing small data..");
                result["small"] = await test.runTest(SMALL, ITERATIONS,true);
                console.log("Testing medium data..");
                result["medium"] = await test.runTest(MEDIUM, ITERATIONS,true);
                console.log("Testing large data..");
                result["large"] = await test.runTest(LARGE, ITERATIONS,true);
                console.log(result);
                process.exit();
    });
    
    program
            .command('range')
            .description('Test range query')
            .action(async () => {
                const test = new TestRange();
                let result = [];
                console.log("Testing small data..");
                result["small"] = await test.runTest(SMALL, ITERATIONS,false);
                console.log("Testing medium data..");
                result["medium"] = await test.runTest(MEDIUM, ITERATIONS,false);
                console.log("Testing large data..");
                result["large"] = await test.runTest(LARGE, ITERATIONS,false);
                console.log(result);
                process.exit();
    });
    
    program
            .command('range-index')
            .description('Test range query using index')
            .action(async () => {
                const test = new TestRange();
                let result = [];
                console.log("Testing small data..");
                result["small"] = await test.runTest(SMALL, ITERATIONS,true);
                console.log("Testing medium data..");
                result["medium"] = await test.runTest(MEDIUM, ITERATIONS,true);
                console.log("Testing large data..");
                result["large"] = await test.runTest(LARGE, ITERATIONS,true);
                console.log(result);
                process.exit();
    });

program
    .command('clear-pg')
    .description('Clear prostgres database')
    .action(async () => {
        const pg = new PostgreService();
        await pg.connect();
        await pg.dropSchema();
        console.log('Database clear');
        process.exit();
    });

program
    .command('clear-mongo')
    .description('Clear mongo database')
    .action(async () => {
        const mongo = new MongoService();
        await mongo.connect();
        await mongo.removeDocuments();
        console.log('Database clear');
        process.exit();
    });

program.parse(process.argv);



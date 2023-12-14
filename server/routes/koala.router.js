const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
router.get('/', (req, res) => {
    // declare queryText, select all koala data, order by name
    const queryText = `SELECT * FROM "koala" ORDER BY "name";`
    
    // send query
    pool.query(queryText)

    // then send back result.rows
    .then((result) => {
        res.send(result.rows)
    }) .catch((error) => {
        console.log('Ope! Your Koalas are stuck!:', error);
    })
})


// POST
router.post('/', (res, req) => {
    // newKoala will be req.body
    let incKoala = req.body
    console.log("New fuzzy Koala:", newKoala);

    // insert newKoala into table
    const queryText = `
    INSERT INTO "koala" ("name", "age", "gender", "ready_for_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
    `

    // set queryParams for queryText
    const queryParams = [incKoala.name, incKoala.age, incKoala.gender, incKoala.ready_for_transfer, incKoala.notes]

    // send queryText and queryParams to DB
    pool.query(queryText, queryParams)

    // then send created status
    .then((result) => {
        res.sendStatus(201)
    }) .catch((error) => {
        console.log("This Koala is staying in the jungle!:", error);
    })
})

// PUT
// when PUT request is made, use koala id to UPDATE 'ready for transfer' to true
router.put('/:id', (req, res) => {
    // get the koala ID
    let koalaId = req.params.id
    console.log("koala ID:", koalaId);

    // declare query text for UPDATE
    const queryText = `
    UPDATE "koala" SET "ready_for_transfer"=true WHERE "id" = $1;
    `

    // declare queryParams for ID
    const queryParams = [koalaId]

    // send UPDATE to DB
    pool.query(queryText, queryParams)

    // then send ok status
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log("Your koala is staying put:", error);
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    // get id param
    let deadKoala = req.param.id
    console.log("This koala has got to go:", deadKoala);

    // queryText for DELETE
    const queryText = `DELETE FROM "koala" WHERE "id"=$1;`
    // queryParams for DELETE
    const queryParams = [deadKoala]

    // send DELETE query to DB
    pool.query(queryText, queryParams)

    // then sendStatus
    .then((result) => {
        console.log("Koala neutralized");
        res.sendStatus(200)
    }) .catch((error) => {
        console.log("Saved by the activists:", error);
    })
} )

module.exports = koalaRouter;
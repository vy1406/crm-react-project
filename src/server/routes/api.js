const express = require('express')
const router = express.Router()
const ClientDao = require('../../db/clientDao')

const clientDao = new ClientDao()
router.get('/clients', async function (req, res) {
    let result = []

    result = await clientDao.getClients()
    res.send(result)
})

// router.post('/transaction', async function (req, res) {
//     let amount = req.body.amount
//     let vendor = req.body.vendor
//     let category = req.body.category

//     await transactionDao.saveTransaction(amount, vendor, category)
//     res.send()
// })
// --------------------------------
// One time function - at deploying the project
// --------------------------------
router.get('/loadData', async function (req, res) {
    await clientDao.populateWithDummyData()
    res.send("populated with dummy data")
})

router.get('/dropCollection', async function (req, res) {
    await transactionDao.dropCollection()
    res.send("collection droppped")
})
router.get('/test', async function (req, res) {
    res.send("everything is ok")
})

module.exports = router

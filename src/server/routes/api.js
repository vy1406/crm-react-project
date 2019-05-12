const express = require('express')
const router = express.Router()
const ClientDao = require('../../db/clientDao')

const clientDao = new ClientDao()
router.get('/clients', async function (req, res) {
    let result = []
    result = await clientDao.getClients()
    res.send(result)
})

router.post('/client', async function (req, res) {
    await clientDao.saveClient(req.body)
    res.send()
})

router.put('/declareSale', async function(req, res){
    await clientDao.declareSaleForUser(req.body)
    res.send()
})
router.put('/changeEmailType', async function(req, res){
    await clientDao.changeUsersEmailType(req.body)
    res.send()
})
router.put('/changeOwner', async function(req, res){
    await clientDao.changeUserOwner(req.body)
    res.send()
})

// --------------------------------
// One time function - at deploying the project
// --------------------------------
router.get('/loadData', async function (req, res) {
    await clientDao.populateWithDummyData()
    res.send("populated with dummy data")
})

router.get('/dropCollection', async function (req, res) {
    await clientDao.dropCollection()
    res.send("collection droppped")
})
router.get('/test', async function (req, res) {
    res.send("everything is ok")
})

module.exports = router

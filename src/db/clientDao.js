const Client = require("../server/models/client")

class ClientDao {
    async getClients() {
        let result = await Client.find({})
        return result
    }

    async dropCollection() {
        await Client.collection.drop()
        console.log("collection Client was dropped")
    }
    // async saveTransaction(amount, vendor, category) {
    //     let T = new Transaction({ amount, vendor, category })
    //     T.save()
    //     console.log(`Transaction with ${T._id} was saved`)
    // }
    async populateWithDummyData() {
        const dataFromFile = require('../utils/data')

        for (let c of dataFromFile) {
            let clientToSave = new Client({
                name: c.name.split(" ")[0],
                surname: c.name.split(" ")[1],
                emailType: c.emailType,
                firstContact: c.firstContact,
                sold: c.sold,
                owner: c.owner,
                country: c.country
            })
            clientToSave.save()
        }
    }
}

module.exports = ClientDao
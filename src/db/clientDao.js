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
    async saveClient(c) {

        let C = new Client({
            name: c.name,
            surname: c.surname,
            email: c.email,
            firstContact: c.firstContact,
            emailType: c.emailType,
            sold: c.sold,
            owner: c.owner,
            country: c.country,
        })
        console.log("UNCOMENT c.save() in order to save the user")
        // C.save()
        console.log(`Client with ${C._id} was saved`)
    }

    async changeUsersEmailType(params) {
        console.log("in changeUsersEmailType, params:")
        console.log(params)
    }

    async declareSaleForUser(user_id) {
        console.log("in declareSaleForUser ( just make it true )")
        console.log(user_id)
    }

    async changeUserOwner(params) {
        console.log(" in changeUserOwner, params: ")
        console.log(params)
    }
    
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
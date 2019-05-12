const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    name: String,
    surname : String,
    emailType : String,
    firstContact: String,
    sold : Boolean,
    owner : String,
    country : String
})


const Client = mongoose.model("Client", ClientSchema)

module.exports = Client
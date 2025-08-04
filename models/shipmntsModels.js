const mongoose = require("mongoose");

const shipmentsSchema = new mongoose.Schema({
    shipmentsNumber : {
        type : Number,
        unique : true,
        required: true
    },
    hops : [{
        hopsName : {
            type : String,
            required: false
        }
    }]
});

const Shipmnts = mongoose.model("Shipmnts", shipmentsSchema);

module.exports = Shipmnts;

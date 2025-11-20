const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task : {type:String, required :true},
    description : {type : String, required : true},
    completed : {type : Boolean}
})
const { Schema, model } = require('mongoose');

const ExampleSchema = new Schema({

}, { timestamps: true });

module.exports = model('Example', ExampleSchema);
// This is connection Databases

const mongoose = require('mongoose')
const { DB_URL } = require('../helpers/env')

const db = {
    initMongo: async () => {
        console.log('Connecting MongoDB...')
        let success = false
        while (!success) {
            try {
                await mongoose.connect(DB_URL, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
                success = true
            } catch (error) {
                console.log('Error connecting to MongoDB, retrying in 1 second')
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        }
        console.log('database connected...')
    }
}

module.exports = db
 
const {
    createLogger,
    transports,
    format
} = require('winston');

require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'debug',
            db: process.env.MONGODB_URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'log',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;
module.exports = {
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    connectionConfigs: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}
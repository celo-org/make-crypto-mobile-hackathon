const { createClient } = require("@astrajs/collections")

const collection = 'admins'


exports.handler = async (event, context, callback) => {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    })

    const posts = astraClient
        .namespace(process.env.ASTRA_DB_KEYSPACE)
        .collection(collection)


    try {
        var res = await posts.find({})
        // to remove keys from an object
        res = Object.keys(res).map((i) => res[i])

        res = JSON.stringify(res)

        return {
            statusCode: 200,
            body: res
        }
    } catch (e) {
        console.error(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}

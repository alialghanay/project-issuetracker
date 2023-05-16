// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const URI = process.env.MONGO_URI;

// async function main(callback) {
//     // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//     const client = new MongoClient(URI, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       }
//     });
    
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("project-issuetracker").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//       // Make the appropriate DB calls
//       await callback(client);
//     } catch (e) {
//         // Catch any errors
//         console.error(e);
//         throw new Error('Unable to Connect to Database')
//     }
// }


// module.exports = main;

require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;


async function main() {
    try {
        await mongoose.connect(URI);
        console.log('conncation is sucssufull')
    } catch(err) {
        console.log(err)
        console.log('conncation feild')
    }
}

module.exports = main;
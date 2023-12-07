const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const jwt = require('jsonwebtoken')
const port = process.env.port || 5000
require('dotenv').config()


//middleware

app.use(cors())
app.use(express.json())



const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization)
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'Access Denied' });
  }
  if (authorization) {
    console.log('uppp')
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: true, message: 'Unauthorized access - Invalid token' });
      }
      req.decoded = decoded;
      next();
    });
  }
};



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmnxhxd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {




  try {

    // Connect the client to the server	(optional starting in v4.7)

    await client.connect();

    const coffeeCollection = client.db('CafeCoke').collection('coffee')
    const dessertCollection = client.db('CafeCoke').collection('desserts')
    const userCollection = client.db('CafeCoke').collection('users')
    const cartCollection = client.db('CafeCoke').collection('carts')


    //jwt 

    app.post('/jwt', (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({ token })
    })

    //users

    app.get('/users', async (req, res) => {
      let query = { email: req.query.email }
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })

    app.post('/users', async (req, res) => {
      let userInfo = req.body
      console.log(userInfo)
      const result = await userCollection.insertOne(userInfo);
      res.send(result)
    })

    //coffee

    app.get('/coffees', async (req, res) => {
      let query = {}
      if (req.query?._id) {
        query = { _id: new ObjectId(req.query._id) }
      }
      const result = await coffeeCollection.find(query).toArray();
      // console.log(result)
      res.send(result)
    })


    //desserts

    app.get('/desserts', async (req, res) => {
      let query = {}
      if (req.query?._id) {
        query = { _id: new ObjectId(req.query._id) }
      }
      const result = await dessertCollection.find(query).toArray();
      // console.log(result)
      res.send(result)
    })



    //carts

    app.post('/carts', async (req, res) => {
      const cartData = req.body
      console.log(cartData)
      const result = await cartCollection.insertOne(cartData);
      res.send(result)
    })

    app.get('/carts', async (req, res) => {
      let query = { email: req.query.email }
      const result = await cartCollection.find(query).toArray()
      res.send(result)
    })

    // for delete item

    app.delete('/carts', async (req, res) => {
      const email = req.query.email;
      const itemName = req.query.itemName;
      console.log(email, itemName)
      const result = await cartCollection.deleteOne({ email: email, 'name': itemName });
      res.send(result)
    })














    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('cafe-coke is running');
})


app.listen(port, () => {
  console.log('port', port)
})
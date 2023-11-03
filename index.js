const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server Is Runing")
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zvd8xno.mongodb.net/?retryWrites=true&w=majority`;

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
    client.connect();
    // Send a ping to confirm a successful connection
    // client.db("admin").command({ ping: 1 });

    const projectCollections = client.db("toufiqul").collection("projects");
    const personalInfoCollections = client.db("toufiqul").collection("personalInfo");
    const educationsCollections = client.db("toufiqul").collection("educations");
    const softSkillsCollections = client.db("toufiqul").collection("softSkills");
    const techSkillCollections = client.db("toufiqul").collection("techSkill");

    // Personal Information Get API
    app.get("/personalInfo", async (req, res) => {
      const result = await personalInfoCollections.find().toArray();
      res.send(result);
    })



    // Education Information Get API
    app.get("/educations", async (req, res) => {
      const result = await educationsCollections.find().toArray();
      res.send(result);
    })

    // Education Information POST API
    app.post("/addeducations", async (req, res) => {
      const eduInfo = req.body;
      const result = await educationsCollections.insertOne(eduInfo);
      res.send(result);
    })
    // Education Information POST API
    app.delete("/deleteedu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await educationsCollections.deleteOne(query);
      res.send(result);
    })



    // Tech Information Get API
    app.get("/techskills", async (req, res) => {
      const result = await techSkillCollections.find().toArray();
      res.send(result);
    })
    // Tech Information POST API
    app.post("/addtechskill", async (req, res) => {
      const eduInfo = req.body;
      const result = await techSkillCollections.insertOne(eduInfo);
      res.send(result);
    })

    app.delete("/deleteTechSkill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await techSkillCollections.deleteOne(query);
      res.send(result);
    })


    // Soft Information Get API
    app.get("/softskills", async (req, res) => {
      const result = await softSkillsCollections.find().toArray();
      res.send(result);
    })

    // Soft Information POST API
    app.post("/addsoftskill", async (req, res) => {
      const softSkillInfo = req.body;
      const result = await softSkillsCollections.insertOne(softSkillInfo);
      res.send(result);
    })
    // Soft Information DELETE API
    app.delete("/deleteSoftSkill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await softSkillsCollections.deleteOne(query);
      res.send(result);
    })

    // Projects Get API
    app.get("/projects", async (req, res) => {
      const result = await projectCollections.find().toArray();
      res.send(result);
    })
    // GET Single Project API
    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollections.findOne(query);
      res.send(result);
    })


    // Profile Image Patch API

    // Patch route for updating profile_image
    app.patch('/profile_image', async (req, res) => {
      const userId = "653f72873a030a511d105ab4";
      const newProfileImage = req.body;
      console.log(newProfileImage);
      const statusUpdateResult = await personalInfoCollections.updateOne(
        { _id: new ObjectId(userId) },
        { $set: newProfileImage }
      );

      res.send(statusUpdateResult);
    });


    // Profile Name Update Patch API

    // Patch route for updating profile_name
    app.patch('/profile_name_changes', async (req, res) => {
      const userId = "653f72873a030a511d105ab4";
      const newProfileName = req.body;
      console.log(newProfileName);
      const statusUpdateResult = await personalInfoCollections.updateOne(
        { _id: new ObjectId(userId) },
        { $set: newProfileName }
      );

      res.send(statusUpdateResult);
    });


    // Patch route for updating profile_email
    app.patch('/profile_email_changes', async (req, res) => {
      const userId = "653f72873a030a511d105ab4";
      const newProfileEmail = req.body;
      console.log(newProfileEmail);
      const statusUpdateResult = await personalInfoCollections.updateOne(
        { _id: new ObjectId(userId) },
        { $set: newProfileEmail }
      );

      res.send(statusUpdateResult);
    });


    // Patch route for updating profile_summery
    app.patch('/profile_summery_changes', async (req, res) => {
      const userId = "653f72873a030a511d105ab4";
      const newProfileSummery = req.body;
      console.log(newProfileSummery);
      const statusUpdateResult = await personalInfoCollections.updateOne(
        { _id: new ObjectId(userId) },
        { $set: newProfileSummery }
      );

      res.send(statusUpdateResult);
    });

    // Patch route for updating profile_summery
    app.patch('/profile_about_summery_changes', async (req, res) => {
      const userId = "653f72873a030a511d105ab4";
      const newProfileAboutSummery = req.body;
      console.log(newProfileAboutSummery);
      const statusUpdateResult = await personalInfoCollections.updateOne(
        { _id: new ObjectId(userId) },
        { $set: newProfileAboutSummery }
      );

      res.send(statusUpdateResult);
    });



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
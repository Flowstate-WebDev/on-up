import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://IgorHuelle:${encodeURI("VM1DvrEefRptK4ZH")}@cluster512mb.6glo0.mongodb.net/?appName=Cluster512MB`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
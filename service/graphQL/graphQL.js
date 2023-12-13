const { buildSchema } = require('graphql');
const { ObjectId } = require('mongodb');

const { mongoDBConnection } = require('../mongoDB/mongoDBConnection');
const config = require('../../config/config.json');
const graphQLSchema = require('./graphQLSchema');

const db = mongoDBConnection();

const user = config.mongoDB.collection.user;
const userCollection = db.collection(user);

const blog = config.mongoDB.collection.blog;
const blogCollection = db.collection(blog);

const schema = buildSchema(graphQLSchema);

// resolver
const rootValue = {
    getUser: async ({ name, id }) => {
        return await userCollection.findOne({
            $or: [
                {
                    _id: {
                        $eq: new ObjectId(id)
                    }
                },
                {
                    name: {
                        $eq: name
                    }
                }
            ]
        });
    },
    getBlog: async ({ title, id }) => {
        return await blogCollection.findOne({
            $or: [
                {
                    _id: {
                        $eq: new ObjectId(id)
                    }
                },
                {
                    title: {
                        $eq: title
                    }
                }
            ]
        });
    },
    createUser: async ({ name, email, username, password }) => {
        const findUser = await userCollection.findOne({
            $or: [
                {
                    username: {
                        $eq: username
                    }
                },
                {
                    email: {
                        $eq: email
                    }
                }
            ]
        });

        if (findUser)
            return "User already exists!";

        await userCollection.insertOne({
            name, email, username, password
        });

        return "User created successfully!";
    },
    createBlog: async ({ title, content, createdAt }) => {
        const findBlog = await blogCollection.findOne({
            title: {
                $eq: title
            }
        });

        if (findBlog)
            return "Blog title already exists!";

        await blogCollection.insertOne({
            title, content, createdAt
        });

        return "Blog created successfully!";
    }
};

module.exports = {
    schema,
    rootValue
};
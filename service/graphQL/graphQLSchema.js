module.exports = `
type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    password: Int!
}

type Blog {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
}

type mutationResponse { 
    acknowledged: Boolean, 
    insertedId: String
}

type userQueryResponse {
    _id: ID!
    name: String!
    username: String!
    email: String!
}

type blogQueryResponse {
    _id: ID!
    title: String!
    content: String!
    createdAt: String!
}

type Query {
    getUser(id: ID): userQueryResponse
    getBlog(id: ID): blogQueryResponse
}

type Mutation {
    createUser(
        name: String
        username: String
        email: String
        password: String
    ): String
    createBlog(
        title: String
        content: String
        createdAt: String
    ): String
}
`;
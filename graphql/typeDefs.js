const gql = require('graphql-tag');

module.exports = gql`
# -------- for getting user posts
    type Comment {
        id: ID!,
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        id: ID!,
        username: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!,
        likeCount: Int!,
        commentCount: Int!
    }
    
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
# -------- end user posts

# User login/registration
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
# End: User login/registration

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: String!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`;


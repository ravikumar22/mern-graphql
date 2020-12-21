const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;                
            }
            catch(err) {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                }
                throw new Error('Post not found');
            }
            catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            
            const newPost = new Post({ 
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toUTCString()
            });

            return await newPost.save();

        },

        async deletePost(_, { postId }, context){
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if(user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            }
            catch(err) {
                console.log(err);
                throw new Error(err);
            }
        }
    }
}
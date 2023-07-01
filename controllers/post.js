const { Comment, Post } = require("../models/post");

const createPost = async(req, res) => {
    if (req.user.role === 'a' || req.user.role === 's')
        return await res.status(400).send({ message: 'Agents and owners only are allowed to create posts' });
    try {
        const numPosts = await Post.countDocuments({ owner: req.user.id });
        if (req.user.role === 'o' && numPosts >= 3) {
            return res.status(400).send({ message: "Sorry, owners can't have more than 3 posts" });
        }

        const post = new Post({...req.body });
        const savedPost = await post.save();

        res.status(200).send({ post: savedPost, message: 'Post created successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updatePost = async(req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        console.log(post.owner, req.user.id);
        if (req.user.id != post.owner)
            return res.status(500).send({ message: "You aren't the owner of this post" })
        return post
            .set(req.body)
            .save()
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllPosts = async(req, res) => {
    let filter = {}
    if (req.user.role === 'ag' || req.user.role === 'o')
        filter = { owner: req.user.id }

    return await Post.find(filter)
        .then((posts) => res.status(200).json({ posts }))
        .catch((err) => res.status(500).json({ err }));
}

const changePostState = async(req, res) => {
    if (req.user.role === 's')
        return res.status(400).send({ message: "Students aren't allowed to update other users' posts" });

    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (req.user.role !== 'a' && req.user.id != post.owner)
            return res.status(400).send({ message: "You need to be an admin or post's owner" });

        return post
            .set(req.body)
            .save()
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deletePost = async(req, res) => {
    if (req.user.role === 's')
        return res.status(400).send({ message: "Students aren't allowed to delete other users' posts" });

    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (req.user.role !== 'a' && req.user.id !== post.owner)
            return res.status(400).send({ message: "You need to be an admin or post's owner" });

        return post.deleteOne({ _id: id })
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const addComment = async(req, res) => {
    const id = req.params.id;

    const comment = new Comment({...req.body });

    return await Post.updateOne({ _id: id }, {
            '$push': {
                comments: comment
            }
        }).then((updatedPost) => res.status(200).json(updatedPost))
        .catch((err) => res.status(500).json({ err }));
}

module.exports = { createPost, updatePost, changePostState, getAllPosts, deletePost, addComment }
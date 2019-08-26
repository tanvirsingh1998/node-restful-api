const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//GET All The Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.json({ message: err })
    }
})

router.get('/specific', (req, res) => {
    res.send('we are on specific posts')
})

//SUBMITS A Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch(err) {
        res.json({ message: err })
    }
    
})

//SPECIFIC Posts
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        res.json(post)
    } catch(err) {
        res.json({ message: err })
    }
})

//Delete A Specific Post
router.delete('/:postID', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postID })
        res.json(removedPost)
    } catch (err) {
        res.json(err)
    }
})

//Update A Post
router.patch('/:postID', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postID }, {
            $set: {
                description: req.body.description
            }
        })
        res.json(updatedPost)
    } catch(err) {
        res.json(err)
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const Posts = require('../../models/Posts');
const Users = require('../../models/Users');
const passport = require('passport');

const { addPost, addComment } = require('../../validation/index');


// Post api/posts Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    //Validation
    const checkPost = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        postImg: req.files.postImg
    }
    const { valid, errors } = addPost(checkPost);
    if (!valid) return res.status(400).json(errors);

    //Store Post
    const newPost = new Posts({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        user: req.user.id,
        postImg: req.files.postImg
    })
    newPost.save().then(savedPost => res.json(savedPost))
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: "Something went wrong" });
        })
});


// Get api/posts Public
router.get('/', (req, res) => {
    Posts.find()
        .sort({ date: -1 })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: "Posts not found" });
        })
});


// Get api/posts/:postId Public
router.get('/:postId', (req, res) => {
    Posts.findById(req.params.postId)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: "Post not found" });
        })
})


// DELETE api/posts/ Private
router.delete('/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ _id: req.user.id })
        .then(user => {
            Posts.findById(req.params.postId)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(403).json({ error: "Not authorised" })
                    }
                    post.remove().then(deletedPost => res.json({ success: deletedPost }))
                        .catch(err => {
                            console.log(err);
                            res.status(404).json({ error: "Unable to delete post" });
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).json({ error: "Not authorised to delete post" });
                })
        })
});


// GET api/posts/comment/:postId Public
router.get('/comment/:postId', (req, res) => {
    Posts.findById(req.params.postId)
    .then(post => res.status(200).json(post.comments))
    .catch(err => {
        console.log(err);
        res.status(404).json({ error: "Comment not found" });
    })
});


// POST api/posts/comment/:postId Private
router.post('/comment/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    //Validation
    const checkComment = {
        text: req.body.text
    }
    const { valid, errors } = addComment(checkComment);
    if (!valid) return res.status(400).json(errors);

    //Comment obj
    const newComment ={
        text: req.body.text,
        user: req.user.id,
        author: req.user.name,
        avatar: req.user.avatar,
    };

    Posts.findById(req.params.postId)
        .then(post => {
            post.commentCount++;
            post.comments.push(newComment)
            post.save()
            .then(post => res.status(200).json(post))
            .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: "Comment not found" });
        })
});


//DELETE api/posts/:commentId/comment/:postId Private
router.delete('/:postId/comment/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ isAdmin: true })
    .then(admin => {
        if(admin.id.toString() === req.user.id){
            Posts.findById(req.params.postId)
            .then(post => {
                const delComment = post.comments.filter(comment =>{
                    return comment.id.toString() === req.params.commentId
                }) 
                if(delComment.length > 0){
                    post.commentCount--;
                    const commentIndex = post.comments.indexOf(delComment[0]);
                    post.comments.splice(commentIndex, 1);                    
                    post.save()
                    .then(post => res.status(200).json(post))
                    .catch(err => console.log(err));
                }else{
                    res.status(404).json({ error: "Comment not found" });    
                }
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ error: "Post with comment not found" });
            })
        }else{
            return res.status(403).json({ error: "User not authorised to delete comment" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ error: "Admin user not found" });
    })
});


// GET api/posts/like/:postId Private
router.get('/like/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ _id: req.user.id })
    .then(user => {
        Posts.findById(req.params.postId)
            .then(post => {
                const hasLiked = post.likes.filter(like =>{
                    return like.user.toString() === req.user.id
                })
                if(hasLiked.length > 0){
                    return res.status(400).json({alreadyLiked: "You already liked this post"})
                }
                //Add user to likes array
                post.likeCount++;
                post.likes.unshift({user: req.user.id})
                post.save().then(post => res.status(200).json(post))
                .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ error: "Not authorised to like post" });
            })
    })
})


// GET api/posts/unlike/:postId Private
router.get('/unlike/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ _id: req.user.id })
    .then(user => {
        Posts.findById(req.params.postId)
            .then(post => {
                const hasLiked = post.likes.filter(like =>{
                    return like.user.toString() === req.user.id
                })
                if(hasLiked.length > 0){
                    //Add user to likes array
                    post.likeCount--;
                    post.likes.shift({user: req.user.id})
                    post.save().then(post => res.status(200).json(post))
                    .catch(err => console.log(err));
                }else{
                    return res.status(400).json({alreadyUnliked: "You already unliked this post"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ error: "Not authorised to like post" });
            })
    })
})


module.exports = router;
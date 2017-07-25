var express = require("express"),
    router  = express.Router({mergeParams: true}),// preserve "req.params" from parent
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id).exec(function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err); 
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);   
                }
            });
        }
    });
});

// Comment Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    // distinguish between "req.params.id", "req.params.comment_id"
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {campgroundID: req.params.id, comment: foundComment});
       }
   });
});

// Comment Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
   });
});

// Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");  
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;
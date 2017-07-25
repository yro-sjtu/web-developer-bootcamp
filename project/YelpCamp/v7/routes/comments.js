var express = require("express"),
    router  = express.Router({mergeParams: true}),// preserve "req.params" from parent
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id).exec(function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err); 
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);   
                }
            });
        }
    });
});

// MIDDLEWARE
// check if user has logged in.
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();  
    }
    res.redirect("/login");
}

module.exports = router;
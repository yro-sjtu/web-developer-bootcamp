var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground");


// Index - show all campgrounds
router.get("/", function(req, res){
    // req.user: _id, username
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log("Error: " + err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {id: req.user._id, username: req.user.username}
    }, function(err, campground) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");   
        }
    });
});


// NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log("Error: " + err);
       } else {
           // render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
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
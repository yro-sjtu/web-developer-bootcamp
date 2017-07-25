var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middleware  = require("../middleware");// NOTE: index.js acts like a home page, so just including the directory is enough


// Index - show all campgrounds
router.get("/", function(req, res){
    // req.user: _id, username
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log(err.message);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.create({
        name: req.body.name,
        address: req.body.address,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: {id: req.user._id, username: req.user.username}
    }, function(err, campground) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(campground);
            res.redirect("/campgrounds");   
        }
    });
});

// SHOW - show info about one specific campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err.message);
       } else {
           // render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            // render edit template with that campground
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            // redirect somewhere (show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
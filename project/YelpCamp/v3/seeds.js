var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "At Sunset", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "blah blah blah"
    },
    {
        name: "In the Forest", 
        image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
        description: "blah blah blah"
    },
    {
        name: "Mountain Camp", 
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "blah blah blah"
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            // add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        // create a few comments
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);  
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Create a new comment");
                                }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;

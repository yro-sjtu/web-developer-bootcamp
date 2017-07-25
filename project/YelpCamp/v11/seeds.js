var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "At Sunset", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu erat elementum, condimentum purus quis, eleifend purus. In dolor dui, scelerisque ac ultrices ac, aliquam ut orci. Cras interdum blandit velit, eu iaculis ligula molestie nec. Phasellus faucibus elit at mauris maximus, eget efficitur risus cursus. Nam pretium pellentesque lacus et commodo. Morbi nibh libero, blandit in aliquam non, cursus quis mi. Mauris in nisl consectetur, venenatis libero et, feugiat sapien."
    },
    {
        name: "In the Forest", 
        image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
        description: "Vivamus nec odio tellus. Praesent bibendum quis felis id commodo. Ut tellus libero, laoreet eu luctus sed, tristique in ligula. Vestibulum sem metus, cursus sed pharetra sed, finibus sed metus. Curabitur faucibus tempor egestas. Praesent sed tempus ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque et dignissim eros. Nulla ac urna congue, lacinia erat id, tristique neque. Mauris non consectetur arcu. Aenean vitae turpis arcu. In eget ligula ut ligula bibendum volutpat et sed elit."
    },
    {
        name: "Mountain Camp", 
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Aliquam finibus sit amet turpis a euismod. Fusce a mattis tellus, nec auctor tellus. Morbi mollis tincidunt ex in pulvinar. Duis et tortor a nibh blandit maximus. Fusce dolor orci, molestie vel ornare a, aliquam id tortor. In nec iaculis orci. Aliquam erat volutpat."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds");
        //     // add a few campgrounds
        //     data.forEach(function(seed) {
        //         Campground.create(seed, function(err, campground) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 // create a few comments
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function(err, comment) {
        //                         if(err) {
        //                             console.log(err);  
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Create a new comment");
        //                         }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;

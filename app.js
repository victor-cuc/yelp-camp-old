const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");
  Comment = require("./models/comment");

mongoose.connect(
  "mongodb://localhost:27017/yelp_camp",
  { useNewUrlParser: true }
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

// Campground.create(

//     {name: "Mountain Goats Rest",
//     image: "https://www.quebecoriginal.com/en/listing/images/800x600/ae2894cf-af0a-46dc-904d-8a91b0059376/camping-parc-national-du-mont-tremblant-de-la-diable-camping-secteur-la-diable.jpg",
//     description: "Very nice!"}
//   ,
//   (err, campground) => {
//     if (err) {
//       console.log("Error");
//     } else {
//       console.log("New campground: ")
//       console.log(campground);
//     }
//   });

// const campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"},
//     {name: "Granite Hill", image: "https://www.travelstyle.gr/wp-content/uploads/2018/08/campinggg.jpg"},
//     {name: "Mountain Goats Rest", image: "https://www.quebecoriginal.com/en/listing/images/800x600/ae2894cf-af0a-46dc-904d-8a91b0059376/camping-parc-national-du-mont-tremblant-de-la-diable-camping-secteur-la-diable.jpg"},
//     {name: "Salmon Creek", image: "https://shawglobalnews.files.wordpress.com/2017/06/camping-in-bc.jpg?quality=70&strip=all&w=720"},
//     {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfil1b3s6rnlswTsqnt57_wwtIucynKGP-cZlydRowGzX_IcPLfA"},
//     {name: "Mountain Goats Rest", image: "https://cdnw.elicdn.com/Blog/wp-content/uploads/2017/04/camping.jpg"},
//   ];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });

  // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
  //get data from forms and add to campgrounds array
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { name: name, image: image, description: description };
  // Create new campground and save to db
  Campground.create(newCampground, (err, newCampground) => {
    if (err) {
      console.log(err);
    } else {
      //redirect to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// NEW COMMENT route
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  //lookup campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      });
    }
  });
  //create new comm

  //connect new comm to campground

  //redirect to campground SHOW page
});

app.listen(3000, () => {
  console.log("YelpCamp Server Started!");
});

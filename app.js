const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  const campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f0c671a3eebdbf_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f0c671a3eebdbf_340.jpg"},
    {name: "Mountain Goats Rest", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f0c671a3eebdbf_340.jpg"}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, () => {
  console.log("YelpCamp Server Started!");
});
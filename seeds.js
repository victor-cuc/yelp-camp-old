const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require('./models/comment');

const data = [
  {
    name: "Hora",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51raBj6pwLL._SS500.jpg",
    description: "Hora prieteniei"
  },
  {
    name: "Beautiful Seaside",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltmfrfjtUUH8vDGX2Ylg5jei9XIofIRJx_P6-JvzUobfb0yl6",
    description: "Enjoy the waves"
  },
  {
    name: "La colt de strada",
    image:
      "https://www.cugetliber.ro/imagini/original/atentieundeiesiti1-1398186800.jpg",
    description: "Un mic merge oricunde si oricand"
  },
  {
    name: "Un gulyas?",
    image: "http://cdn1.aradon.ro/2012/04/Tipei1-650x435.jpg",
    description: "Mmmmm..."
  },
  {
    name: "Manu",
    image:
      "https://www.click.ro/sites/default/files/styles/articol/public/6-act-4-894525151.jpg?itok=DbybXY9a",
    description: "Ia-l-ai pe Manu"
  },
  {
    name: "Politia",
    image:
      "http://oltelean.com/wp-content/uploads/2012/04/politia-la-gratar.jpg",
    description: "Si politistii le plac mici"
  }
];

seedDB = () => {
  // Remove all campgrounds
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    }
    console.log("Removed campgrounds!");
    // Add a few campgrounds
    data.forEach(seed => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a campground");
          // Add a few comments
          Comment.create(
            {
              text: "Fain arata... M-as duce!!!",
              author: "Septy Septimiu"

            }, (err, comment) => {
              if (err) {
                console.log("error adding comment");
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            }
          );
        }
      });
    });
  });
};

module.exports = seedDB;

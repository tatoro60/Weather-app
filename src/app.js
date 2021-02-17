const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPAth = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialPAth);

app.use(express.static(public));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sasha Tsatryan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sasha Tsatryan",
    message: "Օգնեցցեք",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sasha Tsatryan",
  });
});
app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page note found",
    name: "Sasha Tsatryan",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page note found",
    name: "Sasha Tsatryan",
  });
});
app.listen(3000);

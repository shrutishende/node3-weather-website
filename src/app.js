const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//setup handle bar engines and location
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: "Shruti Shende",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Shruti Shende",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "help Page",
        name: "Shruti Shende",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address",
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forcast(latitude, longitude, (error, forcastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forcast: forcastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
    //res.send({ temp: 40, location: "Pune", address: req.query.address });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.send("help article not found");
});

app.get("*", (req, res) => {
    res.send("My 404 page");
});

app.listen(port, () => {
    console.log("server is up on port " + port);
});

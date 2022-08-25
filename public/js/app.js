console.log("client side javascript file loaded..");

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("http://localhost:3000/weather?address=" + location).then((res) => {
        res.json().then((dat) => {
            if (dat.error) {
                messageOne.textContent = dat.error;
            } else {
                messageOne.textContent = dat.location;
                messageTwo.textContent = dat.forcast;
                // console.log(dat.location);
                // console.log(dat.forcast);
            }
        });
    });
});

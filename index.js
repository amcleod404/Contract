const day = document.getElementById("day");
const time = document.getElementById("time");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
var count = 0;
var num = Math.round(Math.random() * 1642);
// var ianStart;
// var ianFinish;
// var nikkoStart;
// var nikkoFinish;
// var andrewStart;
// var andrewFinish;
// var ryanStart;
// var ryanFinish;

displayQuote();

function display_c() {
  var refresh = 1000;
  mytime = setTimeout("display_ct()", refresh);
  count++;
  if (count == 80000) {
    if (num == 1642) {
      num = Math.round(Math.random() * 1642);
    } else {
      num++;
    }

    count = 0;
    displayQuote();
  }
}

function display_ct() {
  var x = new Date();
  day.innerHTML =
    ("0" + (x.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + x.getDate()).slice(-2) +
    "/" +
    x.getFullYear();

  time.innerHTML =
    x.getHours() +
    ":" +
    ("0" + x.getMinutes()).slice(-2) +
    ":" +
    ("0" + x.getSeconds()).slice(-2);
  display_c();
}

function displayQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var text = data[num].text;
      text = text.substring(0, text.length - 1);
      theAuthor = data[num].author;
      if (theAuthor == null) {
        theAuthor = "Anonymous";
      }
      quote.innerHTML = text;
      author.innerHTML = "-" + theAuthor;
    });
}

// const clockIn = (id, password) => {
//   switch (id.value.toLowerCase()) {
//     case "definition":
//       if (password == "benchpress") {
//         andrewStart = new Date();
//       } else {
//         alert("incorrect password 🤡");
//       }
//   }
// };

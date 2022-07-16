const $text = document.querySelector("#text"),
  $author = document.querySelector("#author"),
  $main = document.querySelector(".main"),
  $quoteBox = document.querySelector("#quote-box"),
  $tweetBtn = document.querySelector("#tweet-quote"),
  $newBtn = document.querySelector("#new-quote");

let url =
  "https://gist.githubusercontent.com/amr89-dev/96f5ed6b5461c65abd9b336f23616e38/raw/bc40f1d191f3411a1629560070f14602d879395a/quotes_es.json";

const colors = [
  "#0d6efd",
  "#6610f2",
  "#6f42c1",
  "#d63384",
  "#dc3545",
  "#fd7e14",
  "#ffc107",
  "#198754",
  "#20c997",
  "#0dcaf0",
];

const colorChange = () => {
  let randomizerColor = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randomizerColor];

  $quoteBox.setAttribute("style", `color: ${randomColor};`);
  $author.setAttribute("style", `color: ${randomColor};`);
  $main.setAttribute("style", `background-color: ${randomColor};`);
  $tweetBtn.setAttribute("style", `background-color: ${randomColor};`);
  $newBtn.setAttribute("style", `background-color: ${randomColor};`);
};

const getQuotes = async () => {
  try {
    let res = await fetch(url);
    json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let randomQuote =
      json.quotes[Math.floor(Math.random() * json.quotes.length)];

    $text.innerHTML = randomQuote.quote;
    $author.innerHTML = randomQuote.author;

    $tweetBtn.setAttribute("target", `_blank`);
    $tweetBtn.setAttribute(
      "href",
      `https://twitter.com/intent/tweet?hashtags=quotes&text=${$text.innerText} ${$author.innerText}`
    );
  } catch (err) {
    let message = err.statusText || `Ha ocurrido un error`;
    $main.innerHTML = `Error ${err.status}: ${message}`;
  }
};

document.addEventListener("DOMContentLoaded", (e) => {
  getQuotes();
  colorChange();
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#new-quote")) {
    getQuotes();
    colorChange();
  }
});

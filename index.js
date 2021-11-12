const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let editMessage = "";
let message = "";
let isShuffled = false;

let games = [
  {
    name: "Beyond Two Souls",
    image_url:
      "https://cdn1.epicgames.com/lavender/offer/BEYOND_1-2560x1440-78243e22ac01cc0262fcd84df9af6f18.jpg",
  },
  {
    name: "Detroit Become Human",
    image_url:
      "data:image/jpeg;base64,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",
  },
];

const treatedArray = () => {
  const newArr = games.slice();
  if (isShuffled) {
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
  }
  return newArr;
};

const findGameById = (id) => {
  const game = games.find((game, index) => index == id);

  return game;
};

app.get("/", (req, res) => {
  res.render("pages/index", {games: treatedArray(), message});

  setTimeout(() => {
    isShuffled = false;
    message = "";
  }, 1000);
});

app.post("/shuffle", (req, res) => {
  isShuffled = true;
  res.redirect("/");
});

app.get("/edit/:game_id", (req, res) => {
  const game = findGameById(req.params.game_id);

  res.render("pages/edit", {game, editMessage});

  setTimeout(() => {
    editMessage = "";
  }, 1000);
});

app.put("/edit/:game_id", (req, res) => {
  try {
    const game = findGameById(req.params.game_id);

    game.name = req.body.name;
    game.image_url = req.body.image_url;

    editMessage = "Game edited succesfully!";
    res.redirect("/edit");
  } catch (err) {
    console.log(err);
  }
});

app.get("/details/:game_id", (req, res) => {
  const game = findGameById(req.params.game_id);
  res.render("pages/details", game);
});

app.post("/delete/:game_id", (req, res) => {
  const game = findGameById(req.params.game_id);
  games = games.filter(el => el.name != game.name)

  message = "Game deleted succesfully!";
  res.redirect("/");
});

app.get("/create", (req, res) => {
  res.render("pages/create");
});

app.post("/create", (req, res) => {
  const { name, image_url } = req.body;

  const newGame = {
    name,
    image_url,
  };

  games.push(newGame);
  message = "Game created succesfully!";
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

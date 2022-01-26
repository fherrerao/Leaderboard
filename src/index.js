import "./style.css";

const url =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/";

const createNewGame = async () => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: "Fernando's game",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();
  console.log(data.result.slice(14, 34));
};

createNewGame();

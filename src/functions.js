const inputName = document.querySelector('#input-name');
const inputScore = document.querySelector('#input-score');
const playerList = document.querySelector('.leaderboard');
const messageParagraph = document.querySelector('.form');

export default class Players {
  static url =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

  static idGame = '';

  static createNewGame = async () => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        name: "Fernando's game",
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    this.idGame = data.result.slice(14, 34);
  };

  static addNewPlayer = async () => {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.idGame}/scores/`;
    if (inputName.value === '' || inputScore.value === '') {
      return;
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user: inputName.value,
        score: parseInt(inputScore.value, 10),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();
    const message = document.createElement('p');
    message.innerHTML = data.result;
    messageParagraph.appendChild(message);
    setTimeout(() => {
      messageParagraph.removeChild(message);
    }, 3000);
  };

  static getPlayer = async () => {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.idGame}/scores/`;
    const response = await fetch(url);
    const data = await response.json();
    playerList.innerHTML = '';
    if (data.result.length === 0) {
      const players = document.createElement('li');
      players.classList.add('scores');
      players.innerHTML = 'Empty list, please add a new score';
      playerList.appendChild(players);
    }
    data.result.forEach((element) => {
      const players = document.createElement('li');
      players.classList.add('scores');
      players.innerHTML = `${element.user}: ${element.score}`;
      playerList.appendChild(players);
    });
  };
}

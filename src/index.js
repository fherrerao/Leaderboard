import './style.css';
import Players from './functions.js';

const btnRefresh = document.querySelector('#refresh');
btnRefresh.addEventListener('click', Players.getPlayer);

const btnSubmit = document.querySelector('#btn-submit');
btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  Players.addNewPlayer();
});

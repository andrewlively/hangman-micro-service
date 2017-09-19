const { send } = require('micro');
const query = require('micro-query');
const RWG = require(`rwg`);

const EASY_RWG = new RWG({ min: 3, max: 5 });
const MEDIUM_RWG = new RWG({ min: 6, max: 9 });
const HARD_RWG = new RWG({ min: 10, max: 15 });

function getRandomWord(difficulty) {
  if (difficulty === `hard`) {
    return HARD_RWG.getRandomWord();
  }
  
  if (difficulty === `medium`) {
    return MEDIUM_RWG.getRandomWord();
  }

  return EASY_RWG.getRandomWord();
}

module.exports = (req, res) => {
  const { difficulty } = query(req);

  res.setHeader('Access-Control-Allow-Origin', '*');

  const word = getRandomWord(difficulty);

  send(res, 200, { word });
};
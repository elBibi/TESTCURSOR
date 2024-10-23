const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Get a random recipe based on mood
app.get('/recipe/:mood', (req, res) => {
  const mood = req.params.mood;
  db.getRandomRecipeByMood(mood, (err, recipe) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching recipe' });
    } else {
      res.json(recipe);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

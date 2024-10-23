const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    ingredients TEXT,
    instructions TEXT,
    mood TEXT
  )`);

  // Insert sample data
  const sampleRecipes = [
    { name: 'Comfort Mac and Cheese', ingredients: 'Macaroni, cheese, milk, butter', instructions: 'Cook macaroni, mix with cheese sauce', mood: 'sad' },
    { name: 'Energizing Smoothie Bowl', ingredients: 'Banana, berries, spinach, yogurt', instructions: 'Blend ingredients, top with granola', mood: 'happy' },
    { name: 'Spicy Tacos', ingredients: 'Tortillas, ground beef, spices, lettuce, tomato', instructions: 'Cook beef with spices, assemble tacos', mood: 'excited' },
    { name: 'Calming Chamomile Tea', ingredients: 'Chamomile tea bag, honey, lemon', instructions: 'Steep tea, add honey and lemon', mood: 'anxious' },
    { name: 'Indulgent Chocolate Cake', ingredients: 'Flour, sugar, cocoa powder, eggs, milk', instructions: 'Mix ingredients, bake in oven', mood: 'celebratory' },
  ];

  const stmt = db.prepare('INSERT INTO recipes (name, ingredients, instructions, mood) VALUES (?, ?, ?, ?)');
  sampleRecipes.forEach((recipe) => {
    stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood);
  });
  stmt.finalize();
});

function getRandomRecipeByMood(mood, callback) {
  db.get('SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1', [mood], (err, row) => {
    callback(err, row);
  });
}

module.exports = { getRandomRecipeByMood };

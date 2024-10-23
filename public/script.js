document.addEventListener('DOMContentLoaded', () => {
  const moodSelect = document.getElementById('mood');
  const getRecipeButton = document.getElementById('getRecipe');
  const recipeContainer = document.getElementById('recipeContainer');
  const recipeName = document.getElementById('recipeName');
  const ingredients = document.getElementById('ingredients');
  const instructions = document.getElementById('instructions');

  getRecipeButton.addEventListener('click', getRecipe);

  async function getRecipe() {
    const mood = moodSelect.value;
    try {
      const response = await fetch(`http://localhost:3000/recipe/${mood}`);
      const recipe = await response.json();
      
      if (recipe) {
        recipeName.textContent = recipe.name;
        ingredients.textContent = recipe.ingredients;
        instructions.textContent = recipe.instructions;
        recipeContainer.classList.remove('hidden');
      } else {
        alert('No recipe found for this mood. Try another mood!');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Error fetching recipe. Please try again.');
    }
  }
});

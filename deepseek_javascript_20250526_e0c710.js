// Sample recipe data (in a real app, you'd use an API)
const sampleRecipes = [
    {
        id: 1,
        title: "Garlic Butter Chicken",
        ingredients: ["chicken breast", "garlic", "butter"],
        time: 25,
        servings: 2,
        instructions: [
            "Season chicken breasts with salt and pepper",
            "Melt butter in a pan over medium heat",
            "Add minced garlic and sauté for 30 seconds",
            "Add chicken and cook for 6-7 minutes per side",
            "Serve with a drizzle of the garlic butter sauce"
        ],
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec"
    },
    {
        id: 2,
        title: "Caprese Salad",
        ingredients: ["tomatoes", "fresh mozzarella", "basil"],
        time: 10,
        servings: 4,
        instructions: [
            "Slice tomatoes and mozzarella into similar sizes",
            "Arrange on a plate alternating tomato, mozzarella, and basil leaves",
            "Drizzle with olive oil and balsamic glaze",
            "Sprinkle with salt and pepper"
        ],
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b"
    },
    {
        id: 3,
        title: "Avocado Toast",
        ingredients: ["bread", "avocado", "eggs"],
        time: 15,
        servings: 2,
        instructions: [
            "Toast bread to desired crispness",
            "Mash avocado with salt, pepper, and lime juice",
            "Fry or poach eggs",
            "Spread avocado on toast and top with eggs"
        ],
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8"
    }
];

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('recipeModal');
const closeModal = document.querySelector('.close-modal');
const exampleIngredients = document.querySelectorAll('.example-ingredients');

// Example ingredient click handlers
exampleIngredients.forEach(example => {
    example.addEventListener('click', function() {
        const ingredients = this.textContent.split(', ');
        document.getElementById('ingredient1').value = ingredients[0];
        document.getElementById('ingredient2').value = ingredients[1];
        document.getElementById('ingredient3').value = ingredients[2];
        searchRecipes();
    });
});

// Search for recipes
function searchRecipes() {
    const ingredient1 = document.getElementById('ingredient1').value.toLowerCase();
    const ingredient2 = document.getElementById('ingredient2').value.toLowerCase();
    const ingredient3 = document.getElementById('ingredient3').value.toLowerCase();
    
    if (!ingredient1 || !ingredient2 || !ingredient3) {
        alert("Please enter all three ingredients!");
        return;
    }
    
    // In a real app, you would call an API here
    // For demo, we'll filter our sample recipes
    const matchedRecipes = sampleRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
        return recipeIngredients.includes(ingredient1) && 
               recipeIngredients.includes(ingredient2) && 
               recipeIngredients.includes(ingredient3);
    });
    
    displayResults(matchedRecipes);
}

// Display search results
function displayResults(recipes) {
    if (recipes.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No recipes found</h3>
                <p>Try different ingredient combinations</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    recipes.forEach(recipe => {
        html += `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time} mins</span>
                        <span><i class="fas fa-utensils"></i> ${recipe.servings} servings</span>
                    </div>
                    <p class="recipe-description">A delicious recipe using ${recipe.ingredients.join(', ')}</p>
                    <button class="view-recipe">View Recipe</button>
                </div>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
    
    // Add event listeners to recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', function() {
            const recipeId = parseInt(this.getAttribute('data-id'));
            const recipe = sampleRecipes.find(r => r.id === recipeId);
            openRecipeModal(recipe);
        });
    });
}

// Open recipe modal
function openRecipeModal(recipe) {
    document.getElementById('modalRecipeTitle').textContent = recipe.title;
    document.getElementById('modalRecipeImage').src = recipe.image;
    document.getElementById('modalRecipeTime').textContent = recipe.time;
    document.getElementById('modalRecipeServings').textContent = recipe.servings;
    
    const ingredientsList = document.getElementById('modalRecipeIngredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ingredientsList.appendChild(li);
    });
    
    const instructionsList = document.getElementById('modalRecipeInstructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });
    
    modal.style.display = 'block';
}

// Get random recipe
function getRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * sampleRecipes.length);
    const randomRecipe = sampleRecipes[randomIndex];
    
    // Fill the inputs with the random recipe's ingredients
    document.getElementById('ingredient1').value = randomRecipe.ingredients[0];
    document.getElementById('ingredient2').value = randomRecipe.ingredients[1];
    document.getElementById('ingredient3').value = randomRecipe.ingredients[2];
    
    displayResults([randomRecipe]);
}

// Event Listeners
searchBtn.addEventListener('click', searchRecipes);
randomBtn.addEventListener('click', getRandomRecipe);
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize with welcome message
displayResults([]);
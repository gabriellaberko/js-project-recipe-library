// global variables
const recipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "./baked-chicken.jpg",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "./baked-chicken.jpg",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "./baked-chicken.jpg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "./baked-chicken.jpg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: "./baked-chicken.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "./baked-chicken.jpg",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Beef Stew",
    image: "./baked-chicken.jpg",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
  }
]
const apiKey = "cf8d763903c74744a4d13c68cc9aa6c8";
const url = `https://api.spoonacular.com/recipes/random?number=3&apiKey=${apiKey}`;
let activeFilters = [];
let favoriteRecipes = [];

// DOM elements
const allButtons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");
const sortButtons = document.querySelectorAll(".sort-container .btn");
const randomButton = document.getElementById("random-button");
const favoriteButton = document.getElementById("favorite-button");
const cardContainer = document.getElementById("card-container");
const favoriteRecipeHearts = document.querySelectorAll(".card-container .fa-heart");


// fetch data from API
const fetchData = () => {
  fetch(url)

    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })

    .then(data => {
      //console.log(data)
      const fetchedRecipes = data.recipes;

      // if we have a successful fetch we save it to local storage and call showRecipeCards with the data from the fetch
      if(fetchedRecipes && fetchedRecipes.length > 0 ) {
        localStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
        showRecipeCards(fetchedRecipes);
      // if the fetch has no data (empty array)
      } else {
        // use data from local storage (if it has data)
        const storedRecipes = JSON.parse(localStorage.getItem("recipes"));  
        if (storedRecipes && storedRecipes.length > 0) {
          showRecipeCards(storedRecipes);
        } else {
          cardContainer.innerHTML = `<p class="filter-error-message">No recipes found locally or from API.</p>`;
        }
      }
    })

    .catch(error => {
      console.error('Fetch error:', error);
      const storedRecipes = JSON.parse(localStorage.getItem("recipes"));  

      if (storedRecipes && storedRecipes.length > 0) {
        showRecipeCards(storedRecipes);
      } else {
        cardContainer.innerHTML = `<p class="filter-error-message">No recipes found locally or from API.</p>`;
      }
    })
};


const showRecipeCards = (recipeArray) => {
  
  //reset card container before filling it
  cardContainer.innerHTML = "";

  if(!recipeArray || recipeArray.length === 0) {
    cardContainer.innerHTML = `<p class="filter-error-message">Oh no!🥲 Unfortunately there are no recipes matching your current filter. Try another one!</p>`;
  }

  recipeArray.forEach((recipe) => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = recipe.id;

    const heartIconStatus = recipe.markedAsFavorite ? "fas" : "far";

    // create elements in each card with content from each recipe
    card.innerHTML += `
      <div class="heart-icon-container">
      <i class="${heartIconStatus} fa-heart" style="font-size:24px;"></i>
      </div>
      <img src=${recipe.image} alt=${recipe.title}>
      <h3>${recipe.title}</h3>
      <hr class="solid">
      <div class="recipe-information">
        <p><b>Cuisine:</b> ${
          recipe.cuisines && recipe.cuisines.length > 0
          ? recipe.cuisines.join(", ")
          : "Not specified"
        }</p>
        <p><b>Time:</b> ${recipe.readyInMinutes} min</p>
      </div>
      <hr class="solid">
      <div class="recipe-instructions">
        <h4>Instructions:</h4>
        <p>${recipe.instructions}</p>
      </div>
      <hr class="solid">
      <div class="ingredients">
        <h5>Ingredients:</h5>
        <ul class="ingredient-list"></ul>
      </div>
    `
    
    // create a <li> for every ingredient in each recipe and append it to the ingredient list in the card
    recipe.extendedIngredients.forEach((ing) => {
      const eachIngredient = document.createElement("li");
      eachIngredient.textContent = ing.original;
      const ingredientList = card.querySelector(".ingredient-list");
      ingredientList.appendChild(eachIngredient);       
    });

   // append the card to the card container
   cardContainer.appendChild(card);
  });
};

// const showRecipeCards = (recipeArray) => {
  
//   //reset card container before filling it
//   cardContainer.innerHTML = "";

//   if(!recipeArray || recipeArray.length === 0) {
//     cardContainer.innerHTML = `<p class="filter-error-message">Oh no!🥲 Unfortunately there are no recipes matching your current filter. Try another one!</p>`;
//   }

//   recipeArray.forEach((recipe) => {

//     const card = document.createElement("div");
//     card.classList.add("card");
//     card.dataset.id = recipe.id;

//     const heartIconStatus = recipe.markedAsFavorite ? "fas" : "far";

//     // create elements in each card with content from each recipe
//     card.innerHTML += `
//       <div class="heart-icon-container">
//       <i class="${heartIconStatus} fa-heart" style="font-size:24px;"></i>
//       </div>
//       <img src=${recipe.image} alt=${recipe.title}>
//       <h3>${recipe.title}</h3>
//       <hr class="solid"
//       <div class="recipe-information">
//         <p><b>Cuisine:</b> ${recipe.cuisine}</p>
//         <p><b>Time:</b> ${recipe.readyInMinutes} min</p>
//         <p class="popularity"><b>Popularity:</b> ${recipe.popularity}</p>
//       </div>
//       <hr class="solid">
//       <div class="ingredients">
//         <h4>Ingredients:</h4>
//         <ul class="ingredient-list"></ul>
//       </div>
//     `
    
//     // create a <li> for every ingredient in each recipe and append it to the ingredient list in the card
//     recipe.ingredients.forEach((ing) => {
//       const eachIngredient = document.createElement("li");
//       eachIngredient.textContent = ing;
//       const ingredientList = card.querySelector(".ingredient-list");
//       ingredientList.appendChild(eachIngredient);       
//     });

//    // append the card to the card container
//    cardContainer.appendChild(card);
//   });
// };


const filterCardsOnKitchen = activeFilters => {
  // if there is no active filters (all button is active), or in case activeFilters is undefined
  if (!activeFilters || activeFilters.length === 0)  {
    const filteredCards = [];
    showRecipeCards(recipes);
  } else {
    filteredCards = recipes.filter(recipe => 
      activeFilters.includes(recipe.cuisine)
    );
    showRecipeCards(filteredCards);
  }
};


const sortCardsOnPopularity = buttonText => {
  // create an array of the cards
  const cardArray = [...document.querySelectorAll(".card")];
  // get the popularity of each card
  const getPopularity = (card) => {
    const text = card.querySelector(".popularity").textContent;
     // extract and return the number from it
    const number = text.match(/\d+/);
    return number ? parseInt(number[0], 10) : 0;
  };

    cardArray.sort((a, b) => {
    if (buttonText === "Descending") {
      return getPopularity(b) - getPopularity(a);
    } else if (buttonText === "Ascending") {
      return getPopularity(a) - getPopularity(b);
    }
    });

    // re-append the cards in sorted order
    const cardContainer = document.getElementById("card-container");
    cardArray.forEach((card) => 
      cardContainer.appendChild(card)
    );
};


const randomizeCard = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const randomRecipe = recipes[randomIndex];
  showRecipeCards([randomRecipe]);
}


const updateActiveFilters = (buttonText, buttonIsActive) => {
  if(buttonText === "All") {
    activeFilters = [];
  } else if(buttonIsActive) {
    activeFilters.push(buttonText);
  } else {
    activeFilters = activeFilters.filter(activeFilter => activeFilter !== buttonText);
  }
  return activeFilters;
}

const updateFavoriteRecipes = (recipeId, recipeIsLiked) => {
  clickedRecipe = recipes.find(recipe => recipe.id === recipeId);
  // add the property markedAsFavorite to the recipe in the recipes array with the value of true/false from recipeIsLiked
  clickedRecipe.markedAsFavorite = recipeIsLiked;
  
  // include the recipes where markedAsFavorite is truthy 
  favoriteRecipes = recipes.filter(recipe => 
  recipe.markedAsFavorite);
};


document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});



filterButtons.forEach(filterButton => {
  filterButton.addEventListener("click", () => {
    const buttonText = filterButton.innerText;
    
    // if the clicked button is "All", remove the class "active" from all the other buttons
    if(buttonText === "All") {
      allButtons.forEach((button) => button.classList.remove("active"));
      filterButton.classList.add("active");
    // if the clicked button is any other, remove the class "active" from the filterAllButton and toggle the class on the clicked button
    } else if(buttonText !== "All") {
      const filterAllButton = document.getElementById("filter-all-button");
      filterAllButton.classList.remove("active");
      filterButton.classList.toggle("active");
      // remove "active" from sorting buttons or random button, in case they are active
      sortButtons.forEach((sortButton) => sortButton.classList.remove("active"));
      randomButton.classList.remove("active");
    }

    const buttonIsActive = filterButton.classList.contains("active");

    updateActiveFilters(buttonText, buttonIsActive);
    filterCardsOnKitchen(activeFilters);
  });
}); 


sortButtons.forEach(sortButton => {
  sortButton.addEventListener("click", () => {
    // remove the class 'active' from all sort buttons
    sortButtons.forEach((sortButton) => sortButton.classList.remove("active"));

    sortButton.classList.add("active");
    
    const buttonText = sortButton.innerText;
    // only call the sortCards function if button is clicked to active
    if (sortButton.classList.contains("active")) {
      sortCardsOnPopularity(buttonText);
    }
  });
}); 


randomButton.addEventListener("click", () => {
  // remove the class "active" from all buttons
  allButtons.forEach((button) => button.classList.remove("active"));

  randomButton.classList.toggle("active");

  if(randomButton.classList.contains("active")) {
    randomizeCard(); 
  } else {
    showRecipeCards(recipes);
  }
});



// set click listener on cardContainer that always exist in the DOM, since the card and heart icons are added dynamically 
cardContainer.addEventListener("click", (e) => {
  // e.target is the DOM element that was clicked.
  const heartIcon = e.target.closest(".far, .fas");
  const recipeId = parseInt(e.target.closest(".card").dataset.id);

  // exit if the click is not the heart icon
  if (!heartIcon) return;

  // toggle active state of the heart icon
  heartIcon.classList.toggle("far");
  heartIcon.classList.toggle("fas");

  const recipeIsLiked = heartIcon.classList.contains("fas");
  
  updateFavoriteRecipes(recipeId, recipeIsLiked);
});




favoriteButton.addEventListener("click", () => {
  showRecipeCards(favoriteRecipes);
  allButtons.forEach((button) => button.classList.remove("active"));
});

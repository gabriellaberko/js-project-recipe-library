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

const filterButtons = document.querySelectorAll(".filter-container .btn");
const sortButtons = document.querySelectorAll(".sort-container .btn");
const randomButton = document.getElementById("random-button");




const showRecipeCards = (recipeArray, reset = true) => {
  
  const cardContainer = document.getElementById("card-container");
  //if reset is true (as is the default parameter value for the function), reset card container before filling it
  if (reset) {
    cardContainer.innerHTML = "";
  }

  recipeArray.forEach((recipe) => {

    const card = document.createElement("div");
    card.classList.add("card");

    // create elements in each card with content from each recipe
    card.innerHTML += `
      <img src=${recipe.image} alt=${recipe.title}>
      <h3>${recipe.title}</h3>
      <hr class="solid"
      <div class="recipe-information">
        <p><b>Cuisine:</b> ${recipe.cuisine}</p>
        <p><b>Time:</b> ${recipe.readyInMinutes} min</p>
        <p class="popularity"><b>Popularity:</b> ${recipe.popularity}</p>
      </div>
      <hr class="solid">
      <div class="ingredients">
        <h4>Ingredients:</h4>
        <ul class="ingredient-list"></ul>
      </div>
    `
    
    // create a <li> for every ingredient in each recipe and append it to the ingredient list in the card
    recipe.ingredients.forEach((ing) => {
      const eachIngredient = document.createElement("li");
      eachIngredient.textContent = ing;
      const ingredientList = card.querySelector(".ingredient-list");
      ingredientList.appendChild(eachIngredient);       
  });

   // append the card to the card container
   cardContainer.appendChild(card);
  });
};

// TO DO: handle multiple acitive filters

const filterCardsOnKitchen = buttonText => {
  if (buttonText === "All") {
    showRecipeCards(recipes);
  } else {
    const filteredCards = recipes.filter(recipe =>
    recipe.cuisine === buttonText);
    showRecipeCards(filteredCards);
  }
  
  // if (buttonText === "Asian") {
  //   showRecipeCards(fil)
  // } else if (buttonText === "Italian") {
    
  // } else if (buttonText === "Mediterranean") {
    
  // } else if (buttonText === "Middle Eastern") {
    
  // } else if (buttonText === "Mexican") {
    
  // } else if (buttonText === "Descending") {
    
  // } else if (buttonText === "Ascending") {
  
  
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






document.addEventListener("DOMContentLoaded", () => {
  showRecipeCards(recipes);
});


// (1) add an event listener for every button in the node list and add the class "active" only on the clicked button
// (2) get the clicked button's text and use it as an argument when calling the createMessage function


filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const buttonText = filterButton.innerText;
    // if the clicked button is "All", remove the class "active" from all the other buttons
    if(buttonText === "All") {
      filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
      filterButton.classList.add("active");
    // if the clicked button is any other, remove the class "active" from the filterAllButton and toggle the class on the clicked button
    } else if(buttonText !== "All") {
      const filterAllButton = document.getElementById("filter-all-button");
      filterAllButton.classList.remove("active");
      filterButton.classList.toggle("active");
    }
    // only call the filterCards function if button is clicked to active
    if (filterButton.classList.contains("active")) {
      filterCardsOnKitchen(buttonText); 
    }
  });
}); 


sortButtons.forEach((sortButton) => {
  sortButton.addEventListener("click", () => {
    // remove the class 'active' from all sort buttons
    sortButtons.forEach((sortButton) => sortButton.classList.remove("active"));
    // add the class 'active' to the clicked sort button
    sortButton.classList.add("active");
    
    const buttonText = sortButton.innerText;
    // only call the sortCards function if button is clicked to active
    if (sortButton.classList.contains("active")) {
      sortCardsOnPopularity(buttonText);
    }
  });
}); 



  randomButton.addEventListener("click", () => {
    randomButton.classList.toggle("active");

    if(randomButton.classList.contains("active")) {
      randomizeCard(); 
    } else {
      showRecipeCards(recipes);
    }
  });


// TO DO: Limit to only pick one sorting button at a time
// Make sure you cannot chose "All" and other filter options at the same time

const buttons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");
const sortButtons = document.querySelectorAll(".sort-container .btn");

const addMessageToPlaceholder = message => {
  const placeHolderCard = document.getElementById("placeholder");
  const p = document.createElement("p");
  p.textContent = message;
  placeHolderCard.appendChild(p);
}

const createMessage = buttonText => {
  const p = document.createElement("p");
  if (buttonText === "All") {
    addMessageToPlaceholder("You want it all?");
  } else if (buttonText === "Asian") {
    addMessageToPlaceholder("You choose Asian");
  } else if (buttonText === "Italian") {
    addMessageToPlaceholder("You choose Italian");
  } else if (buttonText === "Mediterranean") {
    addMessageToPlaceholder("You choose Mediterranean");
  } else if (buttonText === "Middle Eastern") {
    addMessageToPlaceholder("You choose Middle Eastern");
  } else if (buttonText === "Mexican") {
    addMessageToPlaceholder("You choose Mexican");
  } else if (buttonText === "Descending") {
    addMessageToPlaceholder("Looking for the most popular recepies?");
  } else if (buttonText === "Ascending") {
    addMessageToPlaceholder("The least popular recepies?");
  }};


/* 
- Add an event listener for every button in the node list and add the class "active" only on the clicked button
- Get the clicked button's text and use it as an argument when calling the createMessage function
*/

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
    // only call the create message function if button is active
    if (filterButton.classList.contains("active")) {
      createMessage(buttonText); 
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
    // only call the create message function if button is active
    if (sortButton.classList.contains("active")) {
      createMessage(buttonText); 
    }
  });
}); 


document.addEventListener("DOMContentLoaded", () => {
  createRecipeCards();
});


// create a card for each recipe in the recipes array
const createRecipeCards = () => {
  recipes.forEach((recipe) => {
    // create all the elements for the card and store them in variables
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const cardImage = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const recipeInfoDiv = document.createElement("div");
    const cuisine = document.createElement("p");
    const time = document.createElement("p");
    const servings = document.createElement("p");
    const popularity = document.createElement("p");
    const ingredientsDiv = document.createElement("div");
    const ingredientsTitle = document.createElement("h3");
    const ingredientList = document.createElement("ul")
  
    // append all the elements to the variable cardDiv
    const appendRecipeCardElements = () => {  
      cardDiv.appendChild(cardImage);
      cardDiv.appendChild(cardTitle);
      recipeInfoDiv.appendChild(cuisine);
      recipeInfoDiv.appendChild(time);
      recipeInfoDiv.appendChild(cuisine);
      recipeInfoDiv.appendChild(servings);
      recipeInfoDiv.appendChild(popularity);
      cardDiv.appendChild(recipeInfoDiv);
      ingredientsDiv.appendChild(ingredientsTitle);
      ingredientsDiv.appendChild(ingredientList);
      cardDiv.appendChild(ingredientsDiv);
    };
  
    // take content from the recipes array and put them in all the recipe card elements
    const addRecipeInfoToElements = () => {
        cardImage.src = `${recipe.image}`;
        cardTitle.textContent = `${recipe.title}`;
        cuisine.textContent = `Cuisine: ${recipe.cuisine}`;
        time.textContent = `Time: ${recipe.readyInMinutes}`;
        servings.textContent = `Servings: ${recipe.servings}`;
        popularity.textContent = `Popularity: ${recipe.popularity}`;
        ingredientsTitle.textContent = `Ingredients:`;
        ingredientList.textContent = `${recipe.ingredients}`;
    };
  
    // append the variable cardDiv to the card-container div in the DOM
    const appendRecipeCard = () => {  
      const cardContainer = document.getElementById("card-container");
      cardContainer.appendChild(cardDiv);
    };
  
    appendRecipeCardElements();
    addRecipeInfoToElements();
    appendRecipeCard();
  });
};


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
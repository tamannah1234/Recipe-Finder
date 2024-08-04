const apiId="58b50fcd";
const apiKey="207cd3ef740bdf16e56690b0e46fc4c1";
const baseUrl =`https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const SearchText=document.querySelector(".search-section");
const searchbtn=document.querySelector(".search-btn");

searchbtn.addEventListener("click",()=>FetchRecipe(SearchText.value));

SearchText.addEventListener("keyup",(e) =>{
  const inputVal = SearchText.value;
  if(e.keyCode === 13){
    FetchRecipe(inputVal);
  }
});

function FetchRecipe(type = "noodles") {
  const url=baseUrl +`&q=${type}`;
  fetch(url)
  .then((response)=> response.json())
  .then((data) => FindRecipesList(data.hits))
  .catch((error) => console.log(error));
}
FetchRecipe();
// Fetch Recipe Steps
const RecipeStepsStr=(ingredientLines = [])=>{
  let str=""
  for(let step of ingredientLines){
    str=str + `<li>${step}</li>`
  }
  return str;
};

const FindRecipesList =(recipe=[]) =>{

  recipeContainer.innerHTML=" ";
  recipe.forEach((recipeObj) => {
    const {
      label:RecipeTitle,
      ingredientLines,
      image:recipeImage
    } = recipeObj.recipe;

const getRecipeSteps= RecipeStepsStr(ingredientLines);   
const htmlString=`<div class="Recipe">
                <div class="Recipe-title">${RecipeTitle}</div>
                <div class="Recipe-img">
                    <img src="${recipeImage}" alt="Recipe-img">
                </div>

                <div class="recipe-text">
                    <ul class="recipe-ingredients">
                    ${getRecipeSteps}
                    </ul>
                </div>
            </div>`;
          recipeContainer.insertAdjacentHTML("beforeend",htmlString);
  });
};





import Search from './models/Search';
import * as searchView from './views/searchView'
import Recipe from './models/Recipe';

import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';


/**Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipe
 */
const state = {};
/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput(); //TODO
    //console.log(query);
    if (query) {
        //2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4. Search for recipes
            await state.search.getResult();

            //5. Render results on UI
            clearLoader();
            searchView.renderResult(state.search.result);
        } catch (error) {
            alert('Processing recipe results');
            //clearLoader();
        }

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);

        //console.log(goToPage);
    }
});

/**RECIPE CONTROLLER */
const controlRecipe = async () => {
    //Get Id from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        //Prepare UI for changes 

        //Create recipe object
        state.recipe = new Recipe(id);
        try {
            //Get recipe data and parse ingredients
            
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
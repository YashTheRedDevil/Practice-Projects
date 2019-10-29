import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;


export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src = "${recipe.image_url}"
                            alt = "${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//type=prev or next
const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
                    <span>Page ${type==='prev'?page-1:page+1}</span>
                    <svg class="search__icon">
                        <use href = "img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
                    </svg>
                </button>
<!--
                <button class="btn-inline results__btn--prev">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
                -->`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //Button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `${createButton(page, 'next')}
        ${createButton(page, 'prev')}`;
    } else if (page === pages) {
        //Button to go to previous page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    //console.log(recipes);
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = resPerPage * page;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};
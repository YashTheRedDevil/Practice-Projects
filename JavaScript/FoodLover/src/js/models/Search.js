import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '8486d329678ad37624f67eda4da57143';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.results);
        } catch (error) {
            alert(error);
        }
    }
}
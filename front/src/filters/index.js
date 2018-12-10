import Vue from 'vue';

const filters = (baseUrl) => {
    Vue.filter('imagePath', (value) => {
        return `${baseUrl}/${value}`;
    });
};

export default filters;
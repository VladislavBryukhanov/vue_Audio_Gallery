export default {
    install(Vue, options) {
        Vue.filter('imagePath', (value) => {
            return `${options.baseUrl}/${value}`;
        });
    }
};

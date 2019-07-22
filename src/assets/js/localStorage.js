export default {
    get(name) {
        return JSON.parse(localStorage.getItem(name));
    },

    store(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    },
};
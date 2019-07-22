export default {
    get(name: string): any {
        return JSON.parse(localStorage[name]);
    },

    store(name: string, data: [] | {}): void {
        localStorage.setItem(name, JSON.stringify(data));
    },
};

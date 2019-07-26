export default {
    get(name: string): any {
        if (localStorage[name] === undefined) {
            return null;
        }
        return JSON.parse(localStorage[name]);
    },

    store(name: string, data: [] | {}): void {
        localStorage.setItem(name, JSON.stringify(data));
    },
};

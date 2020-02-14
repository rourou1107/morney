const localStorageKey = 'tagList';
type tagList = {
    data: string[],
    fetch: () => string[],
    create: (name: string) => 'success' | 'duplication',
    save: () => void
}
const tagList: tagList = {
    data: [],
    fetch: function () { // 取
        this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as string[];
        return this.data;
    },
    create(name) {
        if(this.data.indexOf(name) === -1){
            this.data.push(name);
            this.save()
            return 'success'
        }else {
            return 'duplication'
        }
    },
    save() { // 存

        window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
    }
};
export default tagList;

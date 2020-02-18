import createId from '@/lib/createId';

const localStorageKey = 'tagList';
type data = {
    id: string,
    name: string
}
type tagList = {
    data: data[],
    fetch: () => data[],
    create: (name: string) => 'success' | 'duplication',
    save: () => void
}
const tagList: tagList = {
    data: [],
    fetch: function () { // 取
        this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
        return this.data;
    },
    create(name) {
        // data --- [{id: xxx, name: xxx}]
        let names = this.data.map(item => item.name);
        if (names.indexOf(name) === -1) {
            let id = createId().toString();
            this.data.push({id, name});
            this.save();
            return 'success';
        } else {
            return 'duplication';
        }
    },
    save() { // 存
        window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
    }
};
export default tagList;

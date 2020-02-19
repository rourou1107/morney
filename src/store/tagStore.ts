import tagListModel from '@/models/tagListModel';
import createId from '@/lib/createId';

const localStorageKey = 'tagList';
let data = undefined;

function fetch() { // 取
    data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
    return data;
}
function create() {
    // data --- [{id: xxx, name: xxx}]
    let names = data.map(item => item.name);
    if (names.indexOf(name) === -1) {
        let id = createId().toString();
        data.push({id, name});
        save();
        return 'success';
    } else {
        return 'duplication';
    }
}
function save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
}

export default {
    tagList: fetch(),
    fetch: fetch,
    createTag: (name: string) => {
        let success = create(name);
        if (success === 'success') {
            window.alert('创建成功');
        } else if (success === 'duplication') {
            window.alert('标签名重复');
        }
    },
    removeTag: (tag: Tag) => {
        return tagListModel.remove(tag.id);
    },
    updateTag: (id: string, value: string) => {
        return tagListModel.update(id, value);
    },
    findTag: function (id: string) {
        return this.tagList.filter(tag => tag.id === id)[0];
    }
};

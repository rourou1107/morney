import createId from '@/lib/createId';

const localStorageKey = 'tagList';
const tagListModel: tagList = {
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
    update(id, name) {
        const idList = this.data.map(item => item.id);
        // 找到localStorage里面的id为这个的数据
        if (idList.indexOf(id) > -1) {
            const nameList = this.data.map(item => item.name);
            // 判断修改后的name是否重复
            if (nameList.indexOf(name) > -1) {
                return 'duplication';
            } else {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].id === id) {
                        this.data[i].name = name;
                        this.save();
                        return 'success';
                    }
                }
            }
        }
        return 'not found';
    },
    remove(id) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    },
    save() { // 存
        window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
    }
};
export default tagListModel;

import createId from '@/lib/createId';

const localStorageKey = 'tagList';
const tagStore = {
    tagList: [] as Tag[],
    fetchTag() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
        return this.tagList;
    },
    createTag(name: string) {
        // data --- [{id: xxx, name: xxx}]
        let names = this.tagList.map(item => item.name);
        if (names.indexOf(name) === -1) {
            let id = createId().toString();
            this.tagList.push({id, name});
            this.saveTags();
            window.alert('创建成功');
            return 'success';
        } else {
            window.alert('标签名重复');
            return 'duplication';
        }
    },
    removeTag(tag: Tag) {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === tag.id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
        return true;
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) > -1) {
            const nameList = this.tagList.map(item => item.name);
            // 判断修改后的name是否重复
            if (nameList.indexOf(name) > -1) {
                return 'duplication';
            } else {
                for (let i = 0; i < this.tagList.length; i++) {
                    if (this.tagList[i].id === id) {
                        this.tagList[i].name = name;
                        this.saveTags();
                        return 'success';
                    }
                }
            }
        }
        return 'not found';
    },
    findTag: function (id: string) {
        return this.tagList.filter(tag => tag.id === id)[0];
    },
    saveTags() {
        window.localStorage.setItem(localStorageKey, JSON.stringify(this.tagList));
    }
};
tagStore.fetchTag();
export default tagStore;

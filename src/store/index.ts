import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined,
        flag: undefined
    } as myState,
    mutations: {
        fetchRecord(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            if (!record.tags || record.tags.length === 0) {
                window.alert('请至少选择一个标签名');
                return;
            }
            let item: RecordItem = clone(record);
            item.createAt = new Date().toISOString();
            state.recordList.push(item);
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },

        fetchTag(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, name: string) {
            // data --- [{id: xxx, name: xxx}]
            let names = state.tagList.map(item => item.name);
            if (names.indexOf(name) === -1) {
                let id = createId().toString();
                state.tagList.push({id, name});
                store.commit('saveTags');
            } else {
                window.alert('标签名重复');
            }
        },
        setCurrentTag(state, id) {
            state.currentTag = state.tagList.filter(tag => tag.id === id)[0];
        },
        updateTag(state, object: { id: string, name: string }) {
            const {id, name} = object;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) > -1) {
                const index1 = idList.findIndex(value => value === id);
                const nameList = state.tagList.map(item => item.name);
                const index2 = nameList.findIndex(value => value === name);
                if (index1 === index2) { // 修改的标签名与之前相同
                    state.flag = {type: 0, value: true};
                    state.tagList[index1].name = name;
                    store.commit('saveTags');
                    return;
                }
                if (nameList.indexOf(name) > -1) {
                    state.flag = {type: 1, value: false};
                } else if (!name) {
                    state.flag = {type: 2, value: false};
                } else {
                    state.flag = {type: 0, value: true};
                    for (let i = 0; i < state.tagList.length; i++) {
                        if (state.tagList[i].id === id) {
                            state.tagList[i].name = name;
                            store.commit('saveTags');
                        }
                    }
                }

            }
        },
        removeTag(state, tag: Tag) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === tag.id) {
                    index = i;
                    break;
                }
            }
            window.alert('删除成功');
            state.tagList.splice(index, 1);
            store.commit('saveTags');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    }
});
export default store;

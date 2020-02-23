import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
type myState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as myState,
    mutations: {
        fetchRecord(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            let item: RecordItem = clone(record);
            item.createAt = new Date();
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
                window.alert('创建成功');
                // return 'success';
            } else {
                window.alert('标签名重复');
                // return 'duplication';
            }
        },
        setCurrentTag(state, id) {
            state.currentTag = state.tagList.filter(tag => tag.id === id)[0]
        },
        removeTag(state, tag: Tag) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === tag.id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            store.commit('saveTags');
            // return true;
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    }
});
export default store;

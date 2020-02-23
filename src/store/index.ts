import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[],
    },
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
                return 'success';
            } else {
                window.alert('标签名重复');
                return 'duplication';
            }
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    }
});
export default store;

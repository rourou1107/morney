import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
    },
    mutations: {
        fetchRecord(state) {
            state.recordList =  JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        createRecord(state, record: RecordItem) {
            let item: RecordItem = clone(record);
            item.createAt = new Date();
            state.recordList.push(item);
            store.commit('saveRecord');
        }
    }
});
export default store;

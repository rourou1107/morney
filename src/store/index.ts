import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import openTip from '@/lib/tip';
import dayjs from 'dayjs';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined,
        flag: undefined,
        year: undefined,
        month: undefined
    } as myState,
    mutations: {
        fetchRecord(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            if (!record.tags || record.tags.length === 0) {
                openTip('请至少选择一个标签名', 'warning');
                return;
            }
            let item: RecordItem = clone(record);
            item.createAt = new Date().toISOString();
            state.recordList.push(item);
            store.commit('saveRecord');
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
            openTip('保存成功', 'success');

        },

        fetchTag(state) {
            if (!window.localStorage.getItem('tagList')) {
                let names = ['餐饮', '交通', '娱乐'];
                for (let i = 0; i < 3; i++) {
                    let id = createId();
                    state.tagList.push({id: id.toString(), name: names[i]});
                    store.commit('saveTags');
                }
            }
            state.tagList = JSON.parse(window.localStorage.getItem('tagList')
                || '[]');
        },
        createTag(state, name: string) {
            // data --- [{id: xxx, name: xxx}]
            let names = state.tagList.map(item => item.name);
            if (names.indexOf(name) === -1) {
                let id = createId().toString();
                state.tagList.push({id, name});
                store.commit('saveTags');
                openTip('创建成功', 'success');
            } else {
                openTip('标签名重复', 'warning');
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

            state.tagList.splice(index, 1);
            store.commit('saveTags');
            openTip('删除成功', 'success');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },

        fetchMonth(state) {
            state.month = dayjs().month() + 1;
        },
        fetchYear(state) {
            state.year = dayjs().year();
        },
        updateMonth(state, object: { dateType: string, operationType: string }) {
            const {dateType, operationType} = object;
            if (dateType === 'month') {
                if (operationType === '+') {
                    if (state.month) {
                        if (state.month === dayjs().month() + 1) {
                            openTip(`还没有到${state.month + 1}月哦`, 'warning');
                            return;
                        }
                        state.month = state.month < 12 ? state.month + 1 : 1;
                    }
                } else {
                    if (state.month) {
                        state.month = state.month > 1 ? state.month - 1 : 12;
                    }
                }
            }
        },
        updateYear(state, object: { newValue: number, oldValue: number }) {
            const {newValue, oldValue} = object;
            if (oldValue === 12 && newValue === 1) {
                if (state.year) {
                    state.year = state.year + 1;
                }
            } else if (oldValue === 1 && newValue === 12) {
                if (state.year) {
                    state.year = state.year - 1;
                }
            }
        }
    }
});
export default store;

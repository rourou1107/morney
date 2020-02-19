import clone from '@/lib/clone';

const localStorageKey = 'recordList';

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecord() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecord() {
        window.localStorage.setItem(localStorageKey, JSON.stringify(this.recordList));
    },
    createRecord (record: RecordItem) {
        let item: RecordItem = clone(record);
        item.createAt = new Date();
        this.recordList && this.recordList.push(item);
        recordStore.saveRecord();
    },
};
recordStore.fetchRecord();
export default recordStore;

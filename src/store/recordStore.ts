import clone from '@/lib/clone';

const localStorageKey = 'recordList';
let data: RecordItem[] | undefined = undefined;

const recordStore = {
    recordList: data,
    fetch() {
        data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
        return data;
    },
    save() {
        window.localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    createRecord: (record: RecordItem) => {
        let item: RecordItem = clone(record);
        item.createAt = new Date();
        data && data.push(item);
        recordStore.save();
    },
};
recordStore.fetch();
export default recordStore;

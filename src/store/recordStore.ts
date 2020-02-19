import clone from '@/lib/clone';

const localStorageKey = 'recordList';
let data: RecordItem[] | undefined = undefined;

function fetch() {
    data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
    return data;
}

function save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export default {
    recordList: fetch(),
    fetch: fetch,
    save: save,
    createRecord: (record: RecordItem) => {
        let item: RecordItem = clone(record);
        item.createAt = new Date();
        data && data.push(item);
        save();
    },
};

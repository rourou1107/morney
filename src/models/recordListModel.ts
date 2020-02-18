// 对数据的操作封装起来
import clone from '@/lib/clone';

const localStorageKey = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    create(record: RecordItem) { // 新建
        let item: RecordItem = clone(record);
        item.createAt = new Date();
        this.data.push(item);
        this.save()
    },
    fetch() { // 取
        // 做了类型断言, 其余地方使用 fetch 时, 不需要再定义类型了
        this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
        return this.data;
    },
    save() { // 存
        window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
    }
};
export default recordListModel;

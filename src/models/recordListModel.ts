// 对数据的操作封装起来
const localStorageKey = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    // 这样做是有bug的, 因为push的一直是record, 所以指向的地址一直是同一个, 会导致recordList的每一项都是一样的
    // this.recordList.push(this.record);
    // 解决上述的bug -- 对象的深拷贝(先字符串化, 再对象化--为新对象)
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch() { // 取
        // 做了类型断言, 其余地方使用 fetch 时, 不需要再定义类型了
        this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
        return this.data;
    },
    save(data: RecordItem[]) { // 存
        window.localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
};
export default recordListModel;

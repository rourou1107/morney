// id 从localStorage中取, 如果id一开始就设置为0, 那么只要页面一刷新, id就为0。
// 第一个0是保证若localStorage中没有_idMax, id可以为0。第二个0是保证如果parseInt取的是NaN, id可以保证为0。
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
    id++;
    window.localStorage.setItem('_idMax', id.toString());
    return id;
}

export default createId;

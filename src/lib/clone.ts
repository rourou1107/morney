function clone <T> (data:T ): T {
    return JSON.parse(JSON.stringify(data));
}
// T 意思是我传入的是什么类型, 返回的就是什么类型
export default clone;

import clone from '@/lib/clone';
import dayjs from 'dayjs';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class GroupListHelper extends Vue {
    type: string = '-';

    get month() {
        return this.$store.state.month;
    }

    get year() {
        return this.$store.state.year;
    }

    get recordList() {
        // 因为 vue 把 state 定义为 any。所以这里需要断言成具体的数据
        return (this.$store.state as myState).recordList;
    }

    get groupList() {
        type ResultListValue = {
            title: string,
            items: RecordItem[],
            total?: number
        }
        /**
         * resultList = [
         * {title: 2020-02-27,
         * total: 120,
         *  items: [
         *           {tags: ['衣'], notes: '买衣服', type: '-', amount: 120, createAt: '2020-02-27T01:32:58.518Z'},
         *           {tags: ['食'], notes: '吃饭', type: '-', amount: 15, createAt: '2020-02-27T02:32:58.518Z'}
         *         ]},
         *     .........]
         **/
        let resultList: ResultListValue[] = [];
        const recordList = this.recordList;
        const newList = clone(recordList).filter(r => r.types === this.type)
            .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
        if (newList.length === 0 || !newList) {
            return [];
        }
        resultList[0] = {title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]};
        for (let i = 1; i < newList.length; i++) {
            let last = resultList[resultList.length - 1].title;
            if (dayjs(newList[i].createAt).format('YYYY-MM-DD') === last) {
                resultList[resultList.length - 1].items.push(newList[i]);
            } else {
                resultList[resultList.length] = {
                    title: dayjs(newList[i].createAt).format('YYYY-MM-DD'),
                    items: [newList[i]]
                };
            }
        }
        resultList = resultList.filter(r => {
            return dayjs(r.title).isSame(`${this.year}`, 'year')
                && dayjs(r.title).isSame(`${this.year}-${this.month}`, 'month');
        });

        resultList.forEach((item) => {
            item.total = item.items.reduce((sum, current) => {
                return sum + current.amount;
            }, 0);
        });
        return resultList;
    }

    created() {
        this.$store.commit('fetchRecord');
        this.$store.commit('fetchMonth');
        this.$store.commit('fetchYear');
    }
}

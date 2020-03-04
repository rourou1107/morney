<template>
    <layout>
        <Tabs :data-source="typeList"
              :value.sync="type"
              class-prefix="type"
        />
        <MyDate/>
        <div v-if="groupList.length!==0">
            <div v-for="group in groupList" :key="group.title">
                <h3 class="title">
                    {{beautifyTime(group.title)}}
                    <span :class="{orange: type==='+'}">
                    合计:
                    <span>￥{{group.total}} 元</span>
                </span>
                </h3>
                <ol>
                    <li v-for="(item, index) in group.items" :key="index" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="note">{{item.notes}}</span>
                        <span :class="{orange: type==='+'}" class="amount">
                        <span class="mark">{{type==='+' ? '+' : '-'}}</span>
                        <span>{{item.amount}} 元</span>
                    </span>
                    </li>
                </ol>
            </div>
        </div>
        <div v-else class="nothing-wrapper">
            <span class="nothing">暂时没有相关记录</span>
            <img src="../assets/images/cry.jpg" alt="没钱" v-if="type==='+'">
            <img src="../assets/images/good.jpg" alt="节约" v-else>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from '@/components/Layout.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import typeList from '@/constants/typeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';
    import MyDate from '@/components/statistics/MyDate.vue';


    @Component({
        components: {MyDate, Tabs, Layout}
    })
    export default class Statistics extends Vue {
        type: string = '-';
        typeList = typeList;

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

        tagString(tag: string[]) {
            return tag.length === 0 ? '无' : tag.join('，');
        }

        beautifyTime(string: string) {
            const date = dayjs(string);
            const now = dayjs(); // 现在的时间
            if (date.isSame(now, 'day')) {
                return '今天';
            } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else if (date.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (date.isSame(now, 'year')) {
                return date.format('M月D日');
            } else {
                return date.format('YYYY年M月D日');
            }
        }

    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .type-tabs-item { /* >>> 等价于 ::v-deep */
            background: #c4c4c4;

            &.selected {
                background: #ffffff;

                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            padding: 12px 0;
            font-size: 20px;
        }
    }

    %item {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
    }

    .title {
        @extend %item;
        line-height: 24px;
        font-size: 16px;
    }

    .record {
        @extend %item;
        background: #ffffff;

        .note {
            margin-right: auto;
            margin-left: 16px;
            color: #999999;
        }

        .amount {
            display: flex;
            align-items: center;

            .mark {
                padding-right: 3px;
            }
        }
    }

    .orange {
        color: #da9b29;
    }

    .nothing-wrapper {
        text-align: center;

        .nothing {
            display: block;
            padding: 16px;
        }

        img {
            width: 60%;
        }
    }

</style>

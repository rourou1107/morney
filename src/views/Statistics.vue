<template>
    <layout>
        <Tabs :data-source="typeList"
              :value.sync="type"
              class-prefix="type"
        />
        <div v-for="group in groupList" :key="group.title">
            <h3 class="title">
                {{beautifyTime(group.title)}}
                <span :class="{orange: type==='+'}">
                    合计:
                    <span class="mark">{{type==='+' ? '+' : '-'}}</span>
                    <span>{{group.total}} 元</span>
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


    @Component({
        components: {Tabs, Layout}
    })
    export default class Statistics extends Vue {
        type: string = '-';
        typeList = typeList;

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
            const resultList: ResultListValue[] = [];
            const recordList = this.recordList;
            const newList = clone(recordList).filter(r => r.types === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
            // console.log(newList);
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
            resultList.forEach((item) => {
                item.total = item.items.reduce((sum, current) => {
                    return sum + current.amount;
                }, 0);
            });
            console.log(resultList);
            return resultList;
        }

        created() {
            this.$store.commit('fetchRecord');
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
</style>

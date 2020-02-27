<template>
    <layout>
        <Tabs :data-source="typeList"
              :value.sync="type"
              class-prefix="type"
        />
        <Tabs :data-source="intervalList"
              :value.sync="interval"
              class-prefix="interval"
        />
        <div v-for="group in result" :key="group.title">
            {{group.title}}
           <hr/>
            <ol>
                <li v-for="(item, index) in group.items" :key="index">
                    {{item.tags}}
                    {{item.notes}}
                    {{item.amount}}
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
    import intervalList from '@/constants/intervalList';
    import typeList from '@/constants/typeList';

    @Component({
        components: {Tabs, Layout}
    })
    export default class Statistics extends Vue {
        type: string = '-';
        interval: string = 'day';
        intervalList = intervalList;
        typeList = typeList;

        get recordList() {
            // 因为 vue 把 state 定义为 any。所以这里需要断言成具体的数据
            return (this.$store.state as myState).recordList;
        }

        get result() {
            type hashTableValue = {
                title: string,
                items: RecordItem[]
            }
            /**
             * hashTable = {
             *     2020-02-27: {
             *         title: 2020-02-27,
             *         items: [
             *             {tags: ['衣'], notes: '买衣服', type: '-', amount: 120, createAt: '2020-02-27T01:32:58.518Z'},
             *             {tags: ['食'], notes: '吃饭', type: '-', amount: 15, createAt: '2020-02-27T02:32:58.518Z'}
             *         ]
             *     },
             *      .........
             * }
             **/
            const hashTable: { [key: string]: hashTableValue } = {};
            const recordList = this.recordList;
            for (let i = 0; i < recordList.length; i++) {
                const [date] = recordList[i].createAt!.split('T');
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(recordList[i]);
            }
            return hashTable;
        }

        created() {
            this.$store.commit('fetchRecord');
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep {
        .type-tabs-item { /* >>> 等价于 ::v-deep */
            background: #ffffff;

            &.selected {
                background: #c4c4c4;

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
</style>

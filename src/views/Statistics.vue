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
    import Layout from '@/components/Layout.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import typeList from '@/constants/typeList';
    import dayjs from 'dayjs';
    import MyDate from '@/components/statistics/MyDate.vue';
    import {mixins} from 'vue-class-component';
    import GroupListHelper from '@/mixins/groupListHelper';


    @Component({
        components: {MyDate, Tabs, Layout}
    })
    export default class Statistics extends mixins(GroupListHelper) {
        typeList = typeList;

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

<template>
    <layout class-prefix="layout">
        <Tabs :data-source="dataSource"
              :value.sync="type"
              @update:value="value=$event"
              class-prefix="type"
        />
        <div class="wrapper">
            <my-date/>
            <div id="dom-id"></div>
        </div>
    </layout>
</template>

<script lang="ts">
    import {Component, Watch} from 'vue-property-decorator';
    import Layout from '@/components/Layout.vue';
    import Tabs from '@/components/Tabs.vue';
    import MyDate from '@/components/statistics/MyDate.vue';
    import {mixins} from 'vue-class-component';
    import GroupListHelper from '@/mixins/groupListHelper';
    import dayjs from 'dayjs';

    var echarts = require('echarts');

    const dom = window.document.getElementById('dom-id');
    @Component({
        components: {MyDate, Layout, Tabs}
    })
    export default class ECharts extends mixins(GroupListHelper) {
        dataSource = [{text: '收入', value: '+'}, {text: '支出', value: '-'}];

        mounted() {
            this.drawChart();
        }

        @Watch('month')
        handleMonth() {
            this.drawChart();
        }

        @Watch('type')
        handleType() {
            this.drawChart();
        }

        drawChart() {
            let year = this.year;
            let month = this.month;
            let groupListCopy = this.groupList;
            let days = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let day = -1;
            if (this.getLeapYear(this.year)) {
                day = this.month === 2 ? 29 : days[this.month];
            } else {
                day = days[this.month];
            }

            function getDayArr() {
                let arr = [];
                for (let i = 1; i <= day; i++) {
                    arr.push(i);
                }
                return arr;
            }

            let myChart = echarts.init(document.getElementById('dom-id'));
            let option = {
                xAxis: {
                    data: getDayArr(),
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)',
                        }
                    },
                    axisTick: {
                        // interval: 3,
                        inside: true
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)',
                        }
                    },
                },
                series: [
                    {
                        type: 'line',
                        symbol: 'circle',
                        itemStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        data: function () {
                            let arr: number[] = [];
                            for (let i = 0; i < getDayArr().length; i++) {
                                arr[i] = 0;
                            }
                            getDayArr().forEach((d, i) => {
                                groupListCopy.forEach(g => {
                                    if (dayjs(g.title).isSame(`${year}-${month}-${d}`, 'date')) {
                                        if (g.total) {
                                            arr[i] = g.total;
                                        }
                                    }
                                });
                            });
                            return arr;
                        }()
                    }
                ]
            };
            myChart.setOption(option);
        }

        getLeapYear(year: number) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
    }

</script>

<style lang="scss" scoped>
    ::v-deep .layout-content {
        display: flex;
    }

    ::v-deep .type-tabs-item {
        background: #c4c4c4;

        &.selected {
            background: #ffffff;
        }

        &::after {
            display: none;
        }
    }

    .wrapper {
        flex-grow: 1;
        background: #ffffff;

        #dom-id {
            width: 100%;
            height: 400px;
            margin: 0 auto;
        }
    }

</style>

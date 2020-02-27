<template>
    <layout>
        <Tabs :data-source="typeList"
              :value.sync="type"
              :class-prefix="'tabs'"
        />
        <Tabs :data-source="intervalList" :value.sync="interval"/>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from "@/components/Layout.vue";
    import {Component} from 'vue-property-decorator';
    import Types from '@/components/money/Types.vue';
    import Tabs from '@/components/Tabs.vue';
    @Component({
        components: {Tabs, Types, Layout}
    })
    export default class Statistics extends Vue {
        type:string =  '-';
        interval:string = 'day';
        intervalList = [
            {text: '按天', value: 'day'},
            {text: '按周', value: 'week'},
            {text: '按月', value: 'month'}
        ]
        typeList = [
            {text: '支出', value: '-'},
            {text: '收入', value: '+'}
        ]
    }
</script>

<style lang="scss" scoped>
    ::v-deep .tabs-type-item { /* >>> 等价于 ::v-deep */
        background: #ffffff;
        &.selected {
            background: #c4c4c4;
            &::after {
                display: none;
            }
        }
    }
</style>

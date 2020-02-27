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
    }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item { /* >>> 等价于 ::v-deep */
        background: #ffffff;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }
    ::v-deep .interval-tabs-item {
        padding: 12px 0;
        font-size: 20px;
    }
</style>

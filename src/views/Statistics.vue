<template>
    <layout>
        <Types :value.sync="type"
               class-prefix="bbb"/>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from "@/components/Layout.vue";
    import {Component} from 'vue-property-decorator';
    import Types from '@/components/money/Types.vue';
    @Component({
        components: {Types, Layout}
    })
    export default class Statistics extends Vue {
        type:string =  '-';
    }
</script>

<style lang="scss" scoped>
    ::v-deep .bbb-item { /* >>> 等价于 ::v-deep */
        &.selected {
            background: #ffffff;
            &::after {
                display: none;
            }
        }
    }
</style>

<template>
    <ul class="tabs">
        <li v-for="(item) in dataSource"
            :key="item.value"
            @click="select(item)"
            class="tabs-item"
            :class="liClass(item)"
        >
            {{item.text}}
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    type DataSourceItem = {
        text: string,
        value: string
    }
    @Component
    export default class Tabs extends Vue{
        @Prop({required: true, type: Array}) readonly dataSource!: DataSourceItem[];
        @Prop(String) readonly value!: string;
        @Prop(String) readonly classPrefix?: string;
        liClass(item: DataSourceItem) {
            return {
                selected: item.value=== this.value,
                [this.classPrefix+'-tabs-item']: this.classPrefix,
            }
        }
        select(item: DataSourceItem) {
            this.$emit('update:value', item.value);
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #c4c4c4;
        display: flex;
        font-size: 24px;

        &-item{
            width: 50%;
            padding: 20px 0;
            text-align: center;

            &.selected {
                position: relative;

                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    content: '';
                    width: 100%;
                    border: 2px solid;
                }
            }
        }
    }
</style>

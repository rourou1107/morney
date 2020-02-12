<template>
    <layout class-prefix="layout">
        {{record}}
        <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
        <notes @update:value="record.notes=$event"/>
        <types :value.sync="record.types" />
        <number-pad @update:value="record.amount=$event"/>
    </layout>
</template>

<script lang="ts">
    import Layout from '@/components/Layout.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import Types from '@/components/money/Types.vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    type Record = {
        tags: string[],
        notes: string,
        types: string,
        amount: number
    }
    @Component({
        components: {
            Layout, Tags, Notes, Types, NumberPad
        }
    })
    export default class Money extends Vue {
        tags: string[] = ['衣', '食', '住', '行'];
        record: Record = { // 最后会存在数据库里。LocalStorage
            tags: [],
            notes: '',
            types: '-',
            amount: 0
        }
        onUpdateTags(value: string[]) { // 更新被选择标签
            this.record.tags = value;
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>

<style lang="scss" scoped>
</style>

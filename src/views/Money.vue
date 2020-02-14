<template>
    <layout class-prefix="layout">
        <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
        <notes @update:value="record.notes=$event"/>
        <types :value.sync="record.types"/>
        <number-pad @update:value="record.amount=$event" @submit="saveRecord"/>
    </layout>
</template>

<script lang="ts">
    import Layout from '@/components/Layout.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import Types from '@/components/money/Types.vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import model from '@/model.ts';
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';


    // 从localStorage取出之前的值
    const recordList = model.fetch();

    @Component({
        components: {
            Layout, Tags, Notes, Types, NumberPad
        }
    })
    export default class Money extends Vue {
        tags: string[] = ['衣', '食', '住', '行'];
        record: RecordItem = { // 最后会存在数据库里。LocalStorage
            tags: [],
            notes: '',
            types: '-',
            amount: 0,
        };
        recordList: RecordItem[] = recordList;

        onUpdateTags(value: string[]) { // 更新被选择标签
            this.record.tags = value;
        }

        saveRecord() {
            let item: RecordItem = model.clone(this.record);
            item.createAt = new Date();
            this.recordList.push(item);
        }

        @Watch('recordList')
        onRecordListChange() { // 只要 recordList 变, 我就更新 localStorage
            model.save(this.recordList);
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

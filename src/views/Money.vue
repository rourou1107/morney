<template>
    <layout class-prefix="layout">
        <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
        <div class="form-wrapper">
            <form-item
                    form-item="备注"
                    placeholder="请输入备注内容"
                    @update:value="record.notes=$event"/>
        </div>
        <types :value.sync="record.types"/>
        <number-pad @update:value="record.amount=$event" @submit="saveRecord"/>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from '@/components/Layout.vue';
    import Tags from '@/components/money/Tags.vue';
    import FormItem from '@/components/money/FormItem.vue';
    import Types from '@/components/money/Types.vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';
    import {Component, Watch} from 'vue-property-decorator';

    // 从localStorage取出之前的值
    const recordList = recordListModel.fetch();
    @Component({
        components: {
            Layout, Tags, FormItem: FormItem, Types, NumberPad
        }
    })
    export default class Money extends Vue {
        tags = window.tagList;
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
            recordListModel.create(this.record);
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
    .form-wrapper {
        padding: 12px 0;
    }
</style>

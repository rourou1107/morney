<template>
    <layout class-prefix="layout">
        <tags @update:value="onUpdateTags"/>
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
    import {Component} from 'vue-property-decorator';
    import store from '@/store/index2';

    @Component({
        components: {
            Layout, Tags, FormItem: FormItem, Types, NumberPad
        }
    })
    export default class Money extends Vue {
        tags = store.tagList;
        record: RecordItem = { // 最后会存在数据库里。LocalStorage
            tags: [],
            notes: '',
            types: '-',
            amount: 0,
        };
        recordList = store.recordList;

        onUpdateTags(value: string[]) { // 更新被选择标签
            this.record.tags = value;
        }

        saveRecord() {
            store.createRecord(this.record);
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

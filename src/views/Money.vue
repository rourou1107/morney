<template>
    <layout class-prefix="layout">
        <tags @update:value="onUpdateTags"/>
        <div class="form-wrapper">
            <form-item
                    form-item="备注"
                    placeholder="请输入备注内容"
                    :value="record.notes"
                    @update:value="record.notes=$event"/>
        </div>
        <tabs :value.sync="record.types"
              :data-source="typeList"
        />
        <number-pad @update:value="record.amount=$event" @submit="saveRecord"/>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from '@/components/Layout.vue';
    import Tags from '@/components/money/Tags.vue';
    import FormItem from '@/components/money/FormItem.vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import typeList from '@/constants/typeList';

    @Component({
        components: {
            Tabs,
            Layout, Tags, FormItem: FormItem, NumberPad
        }
    })
    export default class Money extends Vue {
        record: RecordItem = {
            tags: [],
            notes: '',
            types: '-',
            amount: 0,
        };
        typeList = typeList;

        get recordList() {
            return this.$store.state.recordList;
        }

        created() {
            // 开始时初始化 recordList
            this.$store.commit('fetchRecord');
        }

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        saveRecord() {
            this.$store.commit('createRecord', this.record);
            this.record.notes = '';
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

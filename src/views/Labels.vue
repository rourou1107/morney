<template>
    <layout>
        <ul class="tags">
            <li v-for="tag in tags" :key="tag">
                <span>{{tag}}</span>
                <Icon name="right"></Icon>
            </li>
        </ul>
        <div class="createTag-wrapper">
            <button class="createTag" @click="createTag">新建标签</button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from '@/components/Layout.vue';
    import {Component} from 'vue-property-decorator';
    import tagList from '@/models/tagListModel';
    tagList.fetch();
    @Component({
        components: {Layout}
    })
    export default class Label extends Vue {
        tags = tagList.data;

        createTag() {
            let name = window.prompt('请输入标签名');
            if (name) {
                let success = tagList.create(name);
                if (success === 'success') {
                    window.alert('创建成功');
                } else if (success === 'duplication') {
                    window.alert('标签名重复');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        padding-left: 16px;
        background: #ffffff;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 44px;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            padding-right: 16px;

            .icon {
                width: 30px;
                height: 30px;
                color: #666;
            }
        }
    }

    .createTag {
        height: 40px;
        padding: 0 20px;
        background: rgba(0, 0, 0, 0.25);
        font-size: 17px;
        color: #ffffff;

        &-wrapper {
            text-align: center;
            margin-top: 44px;
        }
    }
</style>

<template>
    <layout>
        <div class="nav-bar">
            <Icon name="left" class="left-icon"/>
            <span class="title">编辑标签</span>
            <span class="right-icon"/>
        </div>
        <div class="form-wrapper">
            <FormItem form-item="标签名" placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
            <Button>删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Layout from '@/components/Layout.vue';
    import tagList from '@/models/tagListModel';
    import FormItem from '@/components/money/FormItem.vue';
    import Button from '@/components/Button.vue';
    @Component({
        components: {Button, FormItem, Layout}
    })
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id
            const tags = tagList.fetch()
            const tag = tags.filter(tag => tag.id === id)[0]
            if(tag) {
                let name = tag.name
            }else {
                // replace 不会将路由添加到历史记录 history 中
                this.$router.replace('/404')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0 12px 16px;
        background: #ffffff;
        .title {
            font-size: 16px;
        }
        .left-icon {
            width: 24px;
            height: 24px;
        }
        .right-icon {
            width: 24px;
            height: 24px;
        }
    }
    .form-wrapper {
        background: #ffffff;
        margin-top: 6px;
    }
    .button-wrapper {
        text-align: center;
        margin-top: 44px;
    }
</style>

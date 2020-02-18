<template>
    <layout>
        <div class="nav-bar">
            <Icon name="left" class="left-icon" @click="back"/>
            <span class="title">编辑标签</span>
            <span class="right-icon"/>
        </div>
        <div class="form-wrapper">
            <FormItem form-item="标签名"
                      placeholder="请输入标签名"
                      :value="tag.name"
                      @update:value="update"
            />
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Layout from '@/components/Layout.vue';
    import tagListModel from '@/models/tagListModel';
    import FormItem from '@/components/money/FormItem.vue';
    import Button from '@/components/Button.vue';

    @Component({
        components: {Button, FormItem, Layout}
    })
    export default class EditLabel extends Vue {
        tag?: { id: string, name: string } = undefined;

        created() {
            const id = this.$route.params.id;
            const tags = tagListModel.fetch();
            const tag = tags.filter(tag => tag.id === id)[0];
            if (tag) {
                this.tag = tag;
            } else {
                // replace 不会将路由添加到历史记录 history 中
                this.$router.replace('/404');
            }
        }

        update(value: string) {
            if (this.tag) {
                tagListModel.update(this.tag.id, value);
            }
        }

        remove() {
            if (this.tag) {
                tagListModel.remove(this.tag.id);
                this.$router.back();
            }
        }

        back() {
            this.$router.back();
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

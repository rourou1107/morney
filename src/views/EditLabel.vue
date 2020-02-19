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
    import FormItem from '@/components/money/FormItem.vue';
    import Button from '@/components/Button.vue';
    import store from '@/store/index2';

    @Component({
        components: {Button, FormItem, Layout}
    })
    export default class EditLabel extends Vue {
        tag?: Tag = undefined;
        created() {
            this.tag = store.findTag(this.$route.params.id);
            if (!this.tag) {
                this.$router.replace('/404');
            }
        }

        update(value: string) {
            if (this.tag) {
                if(store.updateTag(this.tag.id, value) === 'duplication') {
                    window.alert('标签名重复')
                }
            }
        }

        remove() {
            if (this.tag) {
                store.removeTag(this.tag);
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

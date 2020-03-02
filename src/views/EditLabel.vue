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
    import openTip from '@/lib/tip';

    @Component({
        components: {Button, FormItem, Layout}
    })
    export default class EditLabel extends Vue {
        get tag() {
            return this.$store.state.currentTag;
        }

        created() {
            this.$store.commit('fetchTag');
            const id = this.$route.params.id;
            this.$store.commit('setCurrentTag', id);
            if (!this.tag) {
                this.$router.replace('/404');
            }
        }

        update(value: string) {
            if (this.tag) {
                this.$store.commit('updateTag', {id: this.tag.id, name: value});
            }
        }

        remove() {
            if (this.tag) {
                this.$store.commit('removeTag', this.tag);
                this.$router.back();
            }
        }

        back() {
            // 可能没有输入操作
            if(this.$store.state.flag) {
                if(!this.$store.state.flag.value) {
                    if(this.$store.state.flag.type === 1){
                        openTip('标签名重复', 'warning');
                        return;
                    }else {
                        openTip('请输入标签名', 'warning');
                        return;
                    }
                }
            }
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

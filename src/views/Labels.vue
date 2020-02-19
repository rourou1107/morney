<template>
    <layout>
        <ul class="tags">
            <router-link
                    tag="li"
                    v-for="tag in tags"
                    :key="tag.id"
                    :to="`/labels/edit/${tag.id}`"
            >
                <span>{{tag.name}}</span>
                <Icon name="right"></Icon>
            </router-link>
        </ul>
        <div class="button-wrapper">
            <Button @click="createTag">新建标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from '@/components/Layout.vue';
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import store from '@/store/index2';

    @Component({
        components: {Button, Layout}
    })
    export default class Label extends Vue {
        tags = store.tagList;

        createTag() {
            let name = window.prompt('请输入标签名');
            if (name) {
                store.createTag(name);
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

    .button-wrapper {
        text-align: center;
        margin-top: 44px;
    }
</style>

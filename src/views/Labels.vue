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
    import Layout from '@/components/Layout.vue';
    import {Component, Mixins} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import TagsHelper from '@/mixins/tagsHelper';

    @Component({
        components: {Button, Layout}
    })
    export default class Label extends Mixins(TagsHelper) {
        get  tags() {
            return this.$store.state.tagList;
        }
        created() {
            this.$store.commit('fetchTag');
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

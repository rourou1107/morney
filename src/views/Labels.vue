<template>
    <layout>
        <ul class="tags">
            <li>
                <span>衣</span>
                <Icon name="right"></Icon>
            </li>
            <li>
                <span>食</span>
                <Icon name="right"></Icon>
            </li>
            <li>
                <span>住</span>
                <Icon name="right"></Icon>
            </li>
            <li>
                <span>行</span>
                <Icon name="right"></Icon>
            </li>
        </ul>
        <div class="createTag-wrapper">
            <button class="createTag">新建标签</button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Layout from "@/components/Layout.vue";
    export default {
        name: "Labels",
        components: {Layout}
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

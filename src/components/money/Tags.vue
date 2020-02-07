<template>
    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Tags"
    }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        .current {
            display: flex;
            flex-wrap: wrap;
            li {
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                background: #d9d9d9;
                margin-right: 10px;
                margin-bottom: 15px;
            }
        }
        .new {
            padding-top: 16px;
            color: #999999;
            button {
                padding: 0 5px;
                border-bottom: 1px solid;
            }
        }
    }
</style>

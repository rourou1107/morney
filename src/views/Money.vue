<template>
    <layout>
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="new">
                <button>新增标签</button>
            </div>
        </div>
        <div class="notes">
            <label>
                <span class="name">备注</span>
                <input type="text"/>
            </label>
        </div>
        <div class="type">
            <div>支出</div>
            <div>收入</div>
        </div>
        <div class="numberPad">
            <div class="number"></div>
            <div class="pad">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>OK</button>
                <button>0</button>
                <button>.</button>
            </div>
        </div>
    </layout>
</template>

<script lang="ts">
    import Layout from "@/components/Layout.vue";
    export default {
        name: "Money",
        components: {Layout}
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/helper.scss";
    .tags {
        font-size: 14px;
        padding: 16px;
        .current {
            display: flex;
            li {
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                background: #d9d9d9;
                margin-right: 10px;
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

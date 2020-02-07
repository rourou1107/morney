<template>
    <layout class-prefix="layout">
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
        <div class="notes">
            <label>
                <span class="name">备注</span>
                <input type="text" placeholder="请在这里添加备注"/>
            </label>
        </div>
        <div class="types">
            <div class="selected">支出</div>
            <div>收入</div>
        </div>
        <div class="numberPad">
            <div class="count">100</div>
            <div class="buttons">
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
                <button class="ok">OK</button>
                <button class="zero">0</button>
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

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/styles/helper.scss";
    .numberPad {
        .count {
            @extend %innerShadow;
            font-family: Consolas, monospace; /*编程字体*/
            text-align: right;
            padding: 20px 16px;
            font-size: 36px ;
            border: 1px solid #ccc;

        }
        .buttons {
            $w: 25%;
            $h: 64px;
            $backgroundColor: #F2F2F2;
            @extend %clearFix;
            button {
                width: $w;
                height: $h;
                float: left;
                font-size: 18px;
                &.zero {
                    width: $w*2;
                }
                &.ok {
                    height: $h*2;
                    float: right;
                }
                &:nth-child(1) {
                    background: $backgroundColor;
                }
                &:nth-child(2), &:nth-child(5) {
                    background: darken($backgroundColor, 4%);
                }
                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background: darken($backgroundColor, 4%*2);
                }
                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    background: darken($backgroundColor, 4%*3);
                }
                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    background: darken($backgroundColor, 4%*4);
                }
                &:nth-child(12), &:nth-child(14) {
                    background: darken($backgroundColor, 4%*5);
                }
            }
        }
    }
    .types {
        background: #c4c4c4;
        display: flex;
        font-size: 24px;
        div {
            width: 50%;
            padding: 20px 0;
            text-align: center;
            &.selected {
                position: relative;
                &::after {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    content: '';
                    width: 100%;
                    border: 2px solid;
                }
            }
        }
    }
    .notes {
        padding-left: 16px;
        background: #f5f5f5;
        font-size: 14px;
        label {
            display: flex;
            align-items: center;
            .name {
                padding-right: 16px;
            }
            input {
                height: 56px;
                flex-grow: 1;
            }
        }
    }
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

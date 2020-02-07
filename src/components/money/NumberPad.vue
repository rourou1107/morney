<template>
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
</template>

<script lang="ts">
    export default {
        name: "NumberPad"
    }
</script>

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
</style>

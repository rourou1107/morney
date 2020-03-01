<template>
    <div class="numberPad">
        <div class="count">{{outPut}}</div>
        <div class="buttons">
            <button @click="inputCount">1</button>
            <button @click="inputCount">2</button>
            <button @click="inputCount">3</button>
            <button @click="remove">删除</button>
            <button @click="inputCount">4</button>
            <button @click="inputCount">5</button>
            <button @click="inputCount">6</button>
            <button @click="clear">清空</button>
            <button @click="inputCount">7</button>
            <button @click="inputCount">8</button>
            <button @click="inputCount">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputCount" class="zero">0</button>
            <button @click="inputCount">.</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class NumberPad extends Vue {
        outPut: string = '0';

        inputCount(event: MouseEvent) {
            const button = (event.target as HTMLButtonElement); // 类型断言, event.target 断言为 HTMLButtonElement 类型
            const input = button.textContent as string;
            // 这里要分情况讨论
            // 1. 刚开始为0时, 输入0-9直接替换outPut
            // 2. 刚开始为0时, 输入.显示0.
            // 3. 若已经有.再点击.则不响应
            // 4. outPut长度最大为16
            if (this.outPut.length === 16) {
                return;
            }
            if (this.outPut === '0') {
                if ('0123456789'.indexOf(input) >= 0) {
                    this.outPut = input;
                } else if (input === '.') {
                    this.outPut += input;
                }
                return;
            }
            if (this.outPut.indexOf('.') >= 0 && input === '.') {
                return;
            }
            this.outPut += input;

        }

        remove() {
            if (this.outPut.length === 1) {
                this.outPut = '0';
                return;
            }
            this.outPut = this.outPut.slice(0, -1);
        }

        clear() {
            this.outPut = '0';
        }

        ok() {
            this.$emit('update:value', parseFloat(this.outPut));
            this.$emit('submit'); // 通知更新数据库
            this.outPut = '0';
        }
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
            font-size: 36px;
            border: 1px solid #ccc;
            background: #ffffff;
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

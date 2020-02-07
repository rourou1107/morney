<template>
    <div class="types">
        <div :class=" type==='-'&&'selected'" @click="selectedType('-')">支出</div>
        <div :class=" type==='+'&&'selected'" @click="selectedType('+')">收入</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    @Component // 解释下面的ts代码变为为vue
    export default class Types extends Vue{
        type = '-'; // '-' 代表支出 '+' 代表收入
        selectedType(type: string) {
            if(type !== '-' && type !== '+') {
                throw new Error('type unknown')
            }
            this.type = type
        }
    }

    // js 方式 script 不需要加 lang="ts"
    // export default {
    //     name: "Types",
    //     data() {
    //         return {
    //             type: '-' // '-' 代表支出 '+' 代表收入
    //         }
    //     },
    //     methods: {
    //         selectedType(type) {
    //             if(type !== '+' && type !== '-') { // 确保 type 只能是 + / -
    //                 throw new Error('type unknown')
    //             }
    //             this.type = type
    //         }
    //     }
    // }
</script>

<style lang="scss" scoped>
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
</style>

<template>
    <div class="types">
        <div :class="{[classPrefix+'-item']: classPrefix, selected: value==='-',}"
             @click="selectedType('-')">
            支出
        </div>
        <div :class="{[classPrefix+'-item']: classPrefix, selected: value==='+',}"
             @click="selectedType('+')">
            收入
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component // 解释下面的ts代码变为为vue
    export default class Types extends Vue {
        @Prop(String) readonly value!: string;  // '-' 代表支出 '+' 代表收入。外部传进来比较好控制
        @Prop(String) readonly classPrefix?: string;
        selectedType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('type unknown');
            }
            this.$emit('update:value', type);
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

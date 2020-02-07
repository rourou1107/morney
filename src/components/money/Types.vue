<template>
    <div class="types">
        <div class="selected">支出</div>
        <div>收入</div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Types"
    }
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

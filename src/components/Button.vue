<template>
    <button class="button">
        <slot/>
    </button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    @Component
    export default class Button extends Vue{
    }
</script>

<style lang="scss" scoped>
    .button {
        height: 40px;
        padding: 0 20px;
        background: rgba(0, 0, 0, 0.25);
        font-size: 17px;
        color: #ffffff;
    }
</style>

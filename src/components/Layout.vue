<template>
    <div class="nav-wrapper">
        <div class="content" :class=" classPrefix && `${classPrefix}-content` ">
            <slot/> <!--插槽组件-->
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Layout extends Vue {
        @Prop(String) classPrefix: string | undefined;
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>

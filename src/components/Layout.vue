<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot /> <!--插槽组件-->
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        name: "Layout"
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>

<template>
    <div class="nav-wrapper">
        <div class="content">labels</div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        name: "Labels"
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

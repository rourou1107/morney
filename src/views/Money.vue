<template>
    <layout class-prefix="layout">
        <tags />
        <notes />
        <types :xxx="20"/>
        <number-pad />
    </layout>
</template>

<script lang="ts">
    import Layout from "@/components/Layout.vue";
    import Tags from "@/components/money/Tags.vue";
    import Notes from "@/components/money/Notes.vue";
    import Types from "@/components/money/Types.vue";
    import NumberPad from "@/components/money/NumberPad.vue";
    export default {
        name: "Money",
        components: {NumberPad, Types, Notes, Tags, Layout}
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>

<style lang="scss" scoped>
</style>

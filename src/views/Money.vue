<template>
    <layout class-prefix="layout">
        <tags :data-source.sync="tags"/>
        <notes/>
        <types/>
        <number-pad/>
    </layout>
</template>

<script lang="ts">
    import Layout from '@/components/Layout.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import Types from '@/components/money/Types.vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    @Component({
        components: {
            Layout, Tags, Notes, Types, NumberPad
        }
    })
    export default class Money extends Vue {
        tags: string[] = ['衣', '食', '住', '行']
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

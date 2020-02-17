<template>
    <layout>
        <Icon name="left"/>
        <span>编辑标签</span>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Layout from '@/components/Layout.vue';
    import tagList from '@/models/tagListModel';
    @Component({
        components: {Layout}
    })
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id
            const tags = tagList.fetch()
            const tag = tags.filter(tag => tag.id === id)[0]
            if(tag) {
                let name = tag.name
            }else {
                // replace 不会将路由添加到历史记录 history 中
                this.$router.replace('/404')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

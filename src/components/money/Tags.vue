<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li
                    :class="selectTags.indexOf(tag.name) >= 0 && 'selected'"
                    v-for="tag in tags"
                    :key="tag.id"
                    @click="toggle(tag.name)"
            >
                {{tag.name}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component({
        computed: {
            tags() {
                return this.$store.state.tagList;
            }
        }
    })
    export default class Tags extends Vue {
        selectTags: string[] = [];

        created() {
            this.$store.commit('fetchTag');
        }

        // 切换标签选中事件
        toggle(tag: string) {
            let index = this.selectTags.indexOf(tag);
            if (index === -1) {
                this.selectTags.push(tag);
            } else {
                this.selectTags.splice(index, 1);
            }
            this.$emit('update:value', this.selectTags);
        }

        create() {
            let name = window.prompt('请输入标签名');
            if (name === '' || name === null) {
                return;
            } else {
                this.$store.commit('createTag', name);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        background: #ffffff;

        .current {
            display: flex;
            flex-wrap: wrap;

            li {
                $bgc: #d9d9d9;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                background: $bgc;
                margin-right: 10px;
                margin-bottom: 15px;

                &.selected {
                    background: darken($bgc, 30%);
                    color: #ffffff;
                }
            }
        }

        .new {
            padding-top: 16px;
            color: #999999;

            button {
                padding: 0 5px;
                border-bottom: 1px solid;
            }
        }
    }
</style>

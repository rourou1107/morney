<template>
    <div class="notes">
        <label>
            <span class="name">{{formItem}}</span>
            <input type="text"
                   :placeholder="placeholder"
                   v-model="value"
            />
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class FormItem extends Vue {
        @Prop({required: true}) formItem!: string;
        @Prop() placeholder?: string;
        value: string = '';

        @Watch('value')
        onValueChange(value: string) {
            this.$emit('update:value', value);
        }
    }
</script>

<style lang="scss" scoped>
    .notes {
        padding-left: 16px;
        font-size: 14px;

        label {
            display: flex;
            align-items: center;

            .name {
                padding-right: 16px;
            }

            input {
                height: 40px;
                flex-grow: 1;
            }
        }
    }
</style>

<template>
    <div class="notes">
        <label>
            <span class="name">备注</span>
            <input type="text"
                   placeholder="请在这里添加备注"
                   :value="value"
                   @input="onInput"
            />
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue {
        value: string = '';

        onInput(event: InputEvent) {
            this.value = event.target.value;
        }
    }
</script>

<style lang="scss" scoped>
    .notes {
        padding-left: 16px;
        background: #f5f5f5;
        font-size: 14px;

        label {
            display: flex;
            align-items: center;

            .name {
                padding-right: 16px;
            }

            input {
                height: 56px;
                flex-grow: 1;
            }
        }
    }
</style>

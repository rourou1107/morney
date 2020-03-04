<template>
    <div class="date-wrapper">
        <div class="year">
            <span>{{year}}年</span>
        </div>
        <div class="month">
            <Icon name="full-left" class="left" @click="handleMonth('month', '-')"></Icon>
            <span>
                <span v-show="month<10">0</span>
                <span>{{month}}月</span>
            </span>
            <Icon name="full-right" class="right" @click="handleMonth('month', '+')"></Icon>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';

    @Component
    export default class MyDate extends Vue {
        get month() {
            return this.$store.state.month;
        }

        get year() {
            return this.$store.state.year;
        }

        created() {
            this.$store.commit('fetchMonth');
            this.$store.commit('fetchYear');
        }

        handleMonth(dateType: string, operationType: string) {
            this.$store.commit('updateMonth', {dateType, operationType});
        }

        @Watch('month')
        handleYear(newValue: number, oldValue: number) {
            this.$store.commit('updateYear', {newValue, oldValue});
        }
    }

</script>

<style lang="scss" scoped>
    .date-wrapper {
        background: #ffffff;
        padding: 8px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .year {
            font-size: 14px;
            margin-bottom: 5px;
        }

        .month {
            font-size: 18px;

            .left {
                color: #a0a2a2;
            }

            .right {
                color: #a0a2a2;
            }
        }
    }
</style>

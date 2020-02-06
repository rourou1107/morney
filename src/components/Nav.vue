<template>
    <nav>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>
            标签
        </router-link>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
export default {
    name: "Nav"
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/styles/helper.scss';
    nav {
        display: flex;
        box-shadow: 0 0 3px $taoBao;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 12px;
            .icon {
                width: 32px;
                height: 32px;
            }
        }
        .item.selected {
            color: #f40;
        }
    }
</style>

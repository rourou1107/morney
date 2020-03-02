<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script lang="ts">
export default {
    name: 'App'
}
</script>
<style lang="scss">
    @import '~@/assets/styles/reset.scss';
    /*变量的css需要在使用的每个文件内单独引入*/
    @import "~@/assets/styles/helper.scss";
    /*下为影响全局的css*/
    body {
        background: #e5e5e5;
    }
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1;
        font-size: 16px;
        font-family: $font-hei;
        color: #333;
    }
    body .message {
        min-width: 80px;
        min-height: 50px;
    }
    body .prompt {
        width: 80vw;
    }
</style>

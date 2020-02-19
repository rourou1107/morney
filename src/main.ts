import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';


Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);

// 将数据统一获取, 其余页面直接使用这里获取的数据即可
window.tagList = tagListModel.fetch();


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

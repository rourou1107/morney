import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);

Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

window.onload = function () {
    window.scrollTo(0, 100000);
};

let width = window.document.documentElement.clientWidth;
if (width > 500) {
    window.alert('请使用手机扫描屏幕二维码浏览，以保证浏览最佳。');
    let img = window.document.createElement('img');
    img.src = './img/qrcode.png';
    img.style.position = 'fixed';
    img.style.left = '50%';
    img.style.top = '50%';
    img.style.transform = 'translate(-50%, -50%)';
    window.document.body.appendChild(img);
}

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';


Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);


// record store
window.recordList = recordListModel.fetch();
window.createRecord = (record) => {
    recordListModel.create(record)
}

// tag store
// 将数据统一获取, 其余页面直接使用这里获取的数据即可
window.tagList = tagListModel.fetch();
window.createTag = (name) => {
    let success = tagListModel.create(name);
    if (success === 'success') {
        window.alert('创建成功');
    } else if (success === 'duplication') {
        window.alert('标签名重复');
    }
};
window.removeTag = (tag) => {
    return tagListModel.remove(tag.id);
};
window.updateTag = (id, value) => {
    return tagListModel.update(id, value);
};
window.findTag = function (id) {
    return this.tagList.filter(tag => tag.id === id)[0];
};


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class TagsHelper extends Vue {
    createTag() {
        let name = window.prompt('请输入标签名');
        if (name === '' || name === null) {
            return;
        } else {
            this.$store.commit('createTag', name);
        }
    }
}

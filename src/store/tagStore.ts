import tagListModel from '@/models/tagListModel';

export default {
    // tag store
    // 将数据统一获取, 其余页面直接使用这里获取的数据即可
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        let success = tagListModel.create(name);
        if (success === 'success') {
            window.alert('创建成功');
        } else if (success === 'duplication') {
            window.alert('标签名重复');
        }
    },
    removeTag: (tag: Tag) => {
        return tagListModel.remove(tag.id);
    },
    updateTag: (id: string, value: string) => {
        return tagListModel.update(id, value);
    },
    findTag: function (id: string) {
        return this.tagList.filter(tag => tag.id === id)[0];
    }
}

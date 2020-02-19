import recordStore from '@/store/tagStore';
import tagStore from '@/store/recordStore';

const store = {
    ...recordStore,
    ...tagStore
};
export default store;

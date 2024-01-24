import { ref } from 'vue';
import { instance } from '@/api/axios';

const articles = ref([]);
const getArticleList = async () => {
    try {
        const res = await instance.get('article/list');
        // console.log(res.data.data.data)
        // console.log('오예')
        const response = res.data.data.data;
        return response;
    } catch (err) {
        console.log('삐뽀삐뽀');
    }
};

export {
    articles, getArticleList,
};

import { ref } from 'vue';
import { instance } from '@/api/axios';

const articles = ref([]);
const getArticleList = async () => {
    try {
        const response = await instance.get('article/list');
        return response.data.data.data;
    } catch (error) {
        console.log('실패');
    }
};

export {
    articles, getArticleList,
};

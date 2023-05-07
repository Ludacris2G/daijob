import { SET_LOADING_STATUS, GET_ARTICLES, LIKE_POST } from "../actions/actionType";

export const initState = {
    articles: [],
    loading: false,
}

const articleReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            }
        case LIKE_POST:
            const { id, likes, likeUsers } = action.payload;
            const updatedArticles = state.articles.map((article) => {
                if (article.id === id) {
                    return {
                        ...article,
                        likes: likes,
                        likeUsers: likeUsers,
                    };
                } else {
                    return article;
                }
            });
            return {
                ...state,
                articles: updatedArticles,
            };
        default:
            return state;
    }
};

export default articleReducer;
import { SET_LOADING_STATUS, GET_ARTICLES, LIKE_POST, COMMENT_POST, DELETE_POST } from "../actions/actionType";

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
        case COMMENT_POST:
            const { commentUsers, comments, articleId } = action.payload;
            const updatedArticleComments = state.articles.map((article) => {
                if (article.id === articleId) {
                    return {
                        ...article,
                        comments: comments,
                        commentUsers: commentUsers,
                    };
                } else {
                    return article;
                }
            })
            return {
                ...state,
                articles: updatedArticleComments,
            }
        case DELETE_POST:
            const deletionId = action.payload;
            const postDeletionArticles = state.articles.filter((article) => {
                return article.id !== deletionId;
            });
            return {
                ...state,
                articles: postDeletionArticles,
            }
        default:
            return state;
    }
};

export default articleReducer;
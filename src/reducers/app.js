import {
    SET_BOOKS,
    REDIRECT,
    SET_CATEGORY,
    SET_CURRENT_CATE,
    SET_PAGE_TITLE,
    SET_CATEGORY_2,
    SET_CONTENT_VIEW
}                           from '../constants/ActionTypes';

let initialState = {
    books: [],
    route: 1,
    pageTitle  : "TRẬT ĐẢ DỊCH CỐT TRỤ",
    listCategory1: [],
    listCategory2: [],
    currentCategory: [],
    contentView: ''
};
  
const app = (state = initialState, action) => {
    switch (action.type) { 
        case SET_BOOKS:
            return {...state, books: action.books}
        case REDIRECT:
            return {
                ...state,
                route: action.route
            };
        case SET_CATEGORY:
            return {
                ...state,
                listCategory1: action.list,
                route: 1
            };
        case SET_CATEGORY_2:
            return {
                ...state,
                listCategory2: action.list,
                route: 2
            };
        case SET_CONTENT_VIEW:
            return {
                ...state,
                contentView: action.list,
                route: 3
            };
        case SET_CURRENT_CATE:
            return {
                ...state,
                currentCategory: action.cate
            };
            break;
        case SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.title
            };
            break;
        default:
            return state
    }
}
  
export default app
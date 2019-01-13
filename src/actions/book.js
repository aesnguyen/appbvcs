import {
    SET_BOOKS,
    SET_CATEGORY,
    REDIRECT,
    SET_CURRENT_CATE,
    SET_PAGE_TITLE,
    SET_CATEGORY_2,
    SET_CONTENT_VIEW
}                           from '../constants/ActionTypes';

export function setBooks(books){
    return {
        type        : SET_BOOKS,
        books
    };
}

export function redirect(route){
    return {
        type: REDIRECT,
        route: route
    };
}

export function setCategory1(list){
    return {
        type: SET_CATEGORY,
        list
    };
}

export function setCategory2(list){
    return {
        type: SET_CATEGORY_2,
        list
    };
}

export function setContent(list){
    return {
        type: SET_CONTENT_VIEW,
        list
    };
}

export function setCurrentCate(id, name){
    return {
        type: SET_CURRENT_CATE,
        cate: [id, name]
    };
}

export function setPageTitle(title){
    return {
        type: SET_PAGE_TITLE,
        title
    };
}
import { atom } from 'recoil';

export const categoryState = atom({
    key: 'categoryState',
    default: null
});

export const orderListState = atom({
    key: 'orderListState',
    default: []
})
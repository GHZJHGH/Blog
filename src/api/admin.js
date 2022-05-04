import axios from 'axios';

export const getCategoryListPage = params => { return axios.get(`/categorys/listpage`, { params: params }); };

export const addCategory = params => { return axios.post(`/categorys/add`, params ); };

export const removeCategory = params => { return axios.post(`/categorys/delete`, params ); };

export const batchRemoveCategory = params => { return axios.post(`/categorys/batchDelete`, params ); };

export const editCategory = params => { return axios.post(`/categorys/update`, params ); };


export const getTagListPage = params => { return axios.get(`/tags/listpage`, { params: params }); };

export const addTag = params => { return axios.post(`/tags/add`, params ); };

export const removeTag = params => { return axios.post(`/tags/delete`, params ); };

export const batchRemoveTag = params => { return axios.post(`/tags/batchDelete`, params ); };

export const editTag = params => { return axios.post(`/tags/update`, params ); };


export const getUserListPage = params => { return axios.get(`/users/listpage`, { params: params }); };

export const addUser = params => { return axios.post(`/users/add`, params ); };

export const removeUser = params => { return axios.post(`/users/delete`, params ); };

export const unremoveUser = params => { return axios.post(`/users/unDelete`, params ); };

export const batchRemoveUser = params => { return axios.post(`/users/batchDelete`, params ); };

export const editUser = params => { return axios.post(`/users/update`, params ); };







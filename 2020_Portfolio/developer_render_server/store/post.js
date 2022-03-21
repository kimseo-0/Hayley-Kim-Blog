import throttle from 'lodash.throttle'
import Vue from 'vue'

export const state = () => ({
    allPosts: [],
    searchPosts : [],

    hasMorePost : true,

    post : null,
    comments : [],
    comment : "",

    allHashTags : [],

    reports : [],
});
export const mutations = {
    loadAllPosts(state,payload) {
        const {posts, hashTags} = payload;
        state.allPosts = posts;
        state.allHashTags = hashTags;
    },
    searchHashTag(state,payload) {
        const {posts} = payload;
        state.searchPosts = posts;
    },

    uploadPost(state,payload) {
        const {post} = payload;
        state.allPosts.unshift(post);
    },
    updatePost(state,payload) {
        const {post} = payload;
        state.allPosts.forEach((singlePost, index) => {
            if(singlePost.id === post.id) {
                state.allPosts[index] = post;
                return 0;
            }
        })
    },

    updatePostState(state,payload) {
        const {postId, postState} = payload;
        state.allPosts.forEach((post, index) => {
            if(post.id === postId) {
                state.allPosts[index].state = !postState;
                return 0;
            }
        })
    },
    deletePost(state, payload) {
        const {postId} = payload;
        state.allPosts.forEach((post, index) => {
            if(post.id === postId) {
                state.allPosts.splice(index,1);
                return 0;
            }
        })
    },
    loadSinglePost(state,payload) {
        const {post, comments} = payload;
        state.post = post;
        state.comments = comments;
    },

    addComment(state,payload) {
        const {comments} = payload;
        state.comments = comments;
    },
    updateComment(state,payload) {
        const {comment, index} = payload;
        state.comments[index].text = comment.text;
    },
    updateCommentState(state,payload) {
        const {postId, commentState, index} = payload;
        state.allPosts.forEach((post, postIndex) => {
            if(post.id === postId) {
                state.allPosts[postIndex].Comments[index].state = !commentState;
                return 0;
            }
        })
    },
    deleteComment(state,payload){
        const {index} = payload;
        state.comments.splice(index,1);
    },

    logout(state) {
        state.allPosts= [];
        state.searchPosts = [];
        state.hasMorePost = true;
        state.post = null;
        state.comments = [];
        state.comment = "";
        state.allHashTags = [];
    },
};
export const actions = {
    loadAllPosts({commit}) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get(`http://localhost:7001/post/loadAllPosts`,{
                    withCredentials : true
                });
                const {posts, hashTags} = res.data;
                commit('loadAllPosts',{posts, hashTags});
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },

    uploadImages({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {formData} = payload;
                const res = await this.$axios.post('http://localhost:7001/post/uploadImages',formData,{
                    withCredentials : true
                });
                const {imageUrls} = res.data;
                return resolve({imageUrls});
           } catch (e) {
               console.error(e);
               return reject();
           }
        });
    },
    deleteImage({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {imageUrl} = payload;
                const res = await this.$axios.post('http://localhost:7001/post/deleteImage',{
                    imageUrl
                },{
                    withCredentials : true
                });
                const {info} = res.data;
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    uploadPost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {startTime, endTime, gitHubLink, title, summary, imageUrls, deleteImageUrls, hashTags, deleteHashTags, contentHtml, contentMarkDown} = payload;
                const res = await this.$axios.post('http://localhost:7001/post/uploadPost',{
                    startTime, endTime, gitHubLink, title, summary, imageUrls, deleteImageUrls, hashTags, deleteHashTags, contentHtml, contentMarkDown
                },{
                    withCredentials : true
                });
                const {post} = res.data;
                commit('uploadPost',{post});
                return resolve()
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updatePost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {postId, startTime, endTime, gitHubLink, title, summary, imageUrls, deleteImageUrls, hashTags, deleteHashTags, contentHtml, contentMarkDown} = payload;
                const res = await this.$axios.post(`http://localhost:7001/post/updatePost`,{
                    postId, startTime, endTime, gitHubLink, title, summary, imageUrls, deleteImageUrls, hashTags, deleteHashTags, contentHtml, contentMarkDown
                },{
                    withCredentials : true
                });
                const {post} = res.data;
                commit('updatePost',{post});
                return resolve()
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updatePostState({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {postId, state} = payload;
                const res = await this.$axios.post(`http://localhost:7001/post/updatePostState`,{
                    postId, state
                },{
                    withCredentials : true
                });
                commit('updatePostState',{postId, postState:state});
                return resolve()
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    deletePost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {post} = payload;
                const res = await this.$axios.post(`http://localhost:7001/post/deletePost`,{
                    post
                },{
                    withCredentials : true
                });
                const {info} = res.data;
                commit('deletePost', {postId: post.id});
                return resolve()
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },

    searchHashTag({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {hashTagName} = payload;
                const res = await this.$axios.post(`http://localhost:5001/post/searchHashTag`,{
                    hashTagName
                },{
                    withCredentials : true
                });
                const {posts, info} = res.data;
                commit('searchHashTag',{posts});
                return resolve({info});
            }  catch (e) {
                console.error(e);
                return reject();
            }
        })
    },
    loadSinglePost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {postId} = payload;
                const res = await this.$axios.get(`http://localhost:5001/post/loadSinglePost/${postId}`,{
                    withCredentials : true
                });
                const {post, comments} = res.data;
                commit('loadSinglePost',{post, comments});
                return resolve()
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
};
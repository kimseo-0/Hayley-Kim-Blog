import throttle from 'lodash.throttle'
//import Vue from 'vue'

export const state = () => ({
    posts : [],
    searchPosts : [],

    post : null,
    nextPost : null,
    prevPost : null,
    comments : [],
    comment : "",

    allHashTags : [],
});
export const mutations = {
    loadPosts(state,payload) {
        const {posts, hashTags} = payload;
        state.posts = posts;
        state.allHashTags = hashTags;
    },

    searchPost(state,payload) {
        const {posts} = payload;
        state.searchPosts = posts;
    },
    searchHashTag(state,payload) {
        const {posts} = payload;
        state.searchPosts = posts;
    },

    loadSinglePost(state,payload) {
        const {post, comments} = payload;
        state.post = post;
        state.posts.forEach((post, index) => {
            if (state.post.id === post.id){
                if(index === 0) {
                    state.prevPost = null;
                    state.nextPost = state.posts[index+1];
                    return 0
                }
                if(index===state.posts.length-1) {
                    state.prevPost =  state.posts[index-1];
                    state.nextPost = null;
                    return 0
                }
            }
        });
        state.comments = comments;
    },

    addComment(state,payload) {
        const {comments} = payload;
        state.comments = [...comments];
        console.log(state.comments)
    },
    saveComment(state,payload) {
        const {text} = payload;
        state.comment = text;
    },
    updateComment(state,payload) {
        const {comment, index} = payload;
        state.comments[index].text = comment.text;
    },
    deleteComment(state,payload){
        const {index} = payload;
        state.comments.splice(index,1);
    },
};
export const actions = {
    loadPosts({state, commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get(`http://localhost:5001/post/loadPosts`,{
                    withCredentials : true
                });
                const {posts, hashTags} = res.data;
                commit('loadPosts',{posts, hashTags});
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        })
    },
    searchPost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {text} = payload;
                const res = await this.$axios.post(`http://localhost:5001/post/searchPost`,{
                    text
                },{
                    withCredentials : true
                });
                const {info, posts} = res.data;
                commit('searchPost',{posts});
                return resolve({info});
            }  catch (e) {
                console.error(e);
                return reject();
            }
        })
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
                const {post, comments, info} = res.data;
                if (info === 'loadSinglePost success') {
                    commit('loadSinglePost',{post, comments, info});
                }
                return resolve(info)
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },

    addComment({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {text, postId} = payload;
                const res = await this.$axios.post('http://localhost:5001/comment/addComment',{
                    text, postId
                },{
                    withCredentials : true
                });
                const {comments, info} = res.data;
                if (info === 'addComment success') {
                    commit('addComment',{comments});
                }
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updateComment({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { commentUserId, commentId, text, index } = payload;
                const res = await this.$axios.post('http://localhost:5001/comment/updateComment',{
                    commentUserId, commentId, text
                },{
                    withCredentials : true
                });
                const {comment, info} = res.data;
                if (info === 'updateComment success'){
                    commit("updateComment", {comment, index});
                }
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    deleteComment({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { commentUserId, commentId, index } = payload;
                const res = await this.$axios.post('http://localhost:5001/comment/deleteComment',{
                    commentUserId, commentId
                },{
                    withCredentials : true
                });
                const {info} = res.data;
                if (info === 'deleteComment success') {
                    commit('deleteComment',{index});
                }
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    reportComment({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const { commentId, text } = payload;
                const res = await this.$axios.post('http://localhost:5001/comment/reportComment',{
                    commentId, text
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
};
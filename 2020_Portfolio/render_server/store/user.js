export const state = () => ({
    me : null,
    userLikePostIds : [],

    profile: null,
});
export const mutations = {
    loadProfile(state, payload) {
        const {profile} = payload;
        if (profile) {
            state.profile = profile;
        } else {
            state.profile = {intro:'', careers:[], skills:[]};
        }
    },
    login(state, payload) {
        const {user} = payload;
        state.me = user;
    },
    logout(state) {
        state.me = null;
        state.userLikePostIds= [];
    },
    loadMe(state, payload) {
        const {user} = payload;
        state.me = user;
        user.UserLikePosts.forEach((post) => {
            state.userLikePostIds.push(post.id);
        });
    },
    updateProfile(state, payload) {
        const {user} = payload;
        state.me = user;
    },
    deleteProfile(state) {
        state.me = null;
    },
    addLikePost(state, payload){
        const {postId} = payload;
        state.userLikePostIds.push(postId);
    },
    deleteLikePost(state, payload) {
        const {postId} = payload;
        const index = state.userLikePostIds.indexOf(postId);
        state.userLikePostIds.splice(index, 1);
    },
};
export const actions = {
    loadProfile({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:4001/user/loadProfile',{
                    withCredentials : true
                });
                const {profile, info} = res.data;
                commit('loadProfile',{profile});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    signUp({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {email, password, nickName} = payload;
                const res = await this.$axios.post('http://localhost:4001/user/signUp', {
                    email, password, nickName
                },{
                    withCredentials : true
                });

                const {info, user} = res.data;
                if (info === 'signUp success') {
                    commit('login', {user});
                    return resolve({info});
                }
                return resolve({info});
            } catch (e) {
                console.error(e);
                reject(e);
            }
        })
    },
    login({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {email, password} = payload;
                const res = await this.$axios.post('http://localhost:4001/user/login',{
                    email,
                    password
                },{
                    withCredentials : true
                });

                const {user, info} = res.data;
                if ( info === "login success") {
                    commit('login', {user});
                }
                return resolve({info});
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });

    },
    logout({commit}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.$axios.get('http://localhost:4001/user/logout',{
                    withCredentials : true
                });
                commit('logout');
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    loadMe({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:4001/user/loadMe',{
                    withCredentials : true
                });

                const { user, info } = res.data;
                if (info === 'isLoggedIn') {
                    commit('loadMe',{user});
                }
                return resolve({info});
            } catch (e) {
                console.error(e);
                return reject(e)
            }
        })
    },
    uploadPreviewAvatarImages({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {formData} = payload;
                const res = await this.$axios.post('http://localhost:4001/user/uploadPreviewAvatarImages',formData,{
                    withCredentials : true
                });

                const {imageUrl} = res.data;
                return resolve({imageUrl});
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    deletePreviewAvatarImage({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {imageUrl} = payload;
                const res = await this.$axios.post('http://localhost:4001/post/deletePreviewAvatarImage ',{
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
    updateProfile({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {email, nickName, avatarImageUrl, currentPassword, password} = payload;
                const res = await this.$axios.post('http://localhost:4001/user/updateProfile',{
                    email, nickName,avatarImageUrl, currentPassword, password
                },{
                    withCredentials : true
                });

                const { user, info } = res.data;
                if (info === 'updateProfile success') {
                    commit('updateProfile',{user});
                }
                return resolve({info});
            } catch (e) {
                console.error(e);
                return reject(e)
            }
        })
    },
    deleteProfile({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.post('http://localhost:4001/user/deleteProfile',{
                },{
                    withCredentials : true
                });

                const {info} = res.data;
                commit('deleteProfile');
                return resolve({info});
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },

    addLikePost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {postId} = payload;
                const res = await this.$axios.post('http://localhost:5001/post/addLikePost',{
                    postId
                },{
                    withCredentials : true
                });
                commit('addLikePost',{postId});
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e)
            }
        })
    },
    deleteLikePost({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {postId} = payload;
                const res = await this.$axios.post('http://localhost:5001/post/deleteLikePost',{
                    postId
                },{
                    withCredentials : true
                });
                commit('deleteLikePost',{postId});
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e)
            }
        })
    },
};
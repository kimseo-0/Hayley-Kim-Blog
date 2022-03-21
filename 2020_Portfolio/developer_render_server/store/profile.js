import Vue from 'vue'

export const state = () => ({
    intro: '',
    careers: [],
    skills: [],
});
export const mutations = {
    loadProfile(state, payload) {
        const {profile} = payload;
        state.intro = profile.intro;
        state.careers = profile.careers;
        state.skills = profile.skills;
    },
    addProfile(state, payload) {
        const {type, data} = payload;
        if (type === 'careers') {
            state.careers.push(data)
        } else if (type === 'skills') {
            state.skills.push(data)
        }
    },
    updateProfile(state, payload) {
        const {type, index, data} = payload;
        if (type === 'careers') {
            state.careers[index] = data;
        } else if (type === 'skills') {
            state.skills[index] = data;
        } else if (type === 'intro') {
            state.intro = data;
        }
    },
    deleteProfile(state, payload) {
        const {type, index} = payload;
        if (type === 'careers') {
            state.careers.splice(index, 1)
        } else if (type === 'skills') {
            state.skills.splice(index, 1)
        }
    },
};
export const actions = {
    loadProfile({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/profile/loadProfile',{
                    withCredentials : true
                });
                const {profile, info} = res.data;
                commit('loadProfile',{profile});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    addProfile({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {type, data} = payload;
                const res = await this.$axios.post('http://localhost:7001/profile/addProfile',{
                    type, data
                },{
                    withCredentials : true
                });
                //const {info} = res.data;
                commit('addProfile',{type, data});
                return resolve({})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updateProfile({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {type, index, data} = payload;
                const res = await this.$axios.post('http://localhost:7001/profile/updateProfile',{
                    type, index, data
                },{
                    withCredentials : true
                });
                //const {profile, info} = res.data;
                commit('updateProfile',{type, index, data});
                return resolve({})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    deleteProfile({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {type, index, data} = payload;
                const res = await this.$axios.post('http://localhost:7001/profile/deleteProfile',{
                    type, data
                },{
                    withCredentials : true
                });
                commit('deleteProfile',{type, index});
                return resolve({})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
};
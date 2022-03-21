export const state = () => ({
    me : null,
    users : [],
});
export const mutations = {
    developerLogin(state, payload) {
        const {user} = payload;
        state.me = user;
    },
    checkDeveloper(state, payload) {
        const {user} = payload;
        state.me = user;
    },
    logout(state) {
        state.me = null;
        state.users = [];
    },

    loadUsers(state, payload) {
        const {users} = payload;
        state.users = users;
    },
    deleteUserAuth(state, payload) {
        const {id} = payload;
        state.users.forEach((user, index) => {
            if(user.id === id) {
                state.users[index].state = false;
                return 0;
            }
        })
    },
    addUserAuth(state, payload) {
        const {id} = payload;
        state.users.forEach((user, index) => {
            if(user.id === id) {
                state.users[index].state = true;
                return 0;
            }
        })
    },
};
export const actions = {
    developerLogin({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {email, password} = payload;
                const res = await this.$axios.post('http://localhost:7001/user/developerLogin',{
                    email,
                    password
                },{
                    withCredentials : true
                });

                const {user, info} = res.data;
                if ( info === "developerLogin success") {
                    commit('developerLogin', {user});
                    return resolve({info});
                } else {
                    return resolve({info});
                }
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });

    },
    checkDeveloper({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/user/checkDeveloper',{
                    withCredentials : true
                });

                const { user, info } = res.data;
                if (info === 'isDeveloper') {
                    commit('checkDeveloper',{user});
                    return resolve({info});
                }
                return resolve({info});
            } catch (e) {
                console.error(e);
                return reject(e)
            }
        })
    },
    loadUsers({commit}) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/user/loadUsers',{
                    withCredentials : true
                });
                const {users} = res.data;
                commit('loadUsers', {users});
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    updateUserState({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {id, state} = payload;
                const res = await this.$axios.post('http://localhost:7001/user/updateUserState',{
                    id, state
                }, {
                    withCredentials : true
                });
                const {info} = res.data;
                commit('updateUserState', {id, state});
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
};
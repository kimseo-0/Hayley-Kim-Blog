export const state = () => ({
    contacts: []
});
export const mutations = {
    loadContacts(state, payload) {
        const {contacts} = payload;
        state.contacts = contacts;
    },

    logout(state) {
        state.contacts = [];
    },
};
export const actions = {
    loadContacts({commit}) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/contact/loadContacts',{
                    withCredentials : true
                });
                const {contacts} = res.data;
                commit('loadContacts',{contacts});
                return resolve({})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
};
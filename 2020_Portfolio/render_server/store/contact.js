export const state = () => ({

});
export const mutations = {
};
export const actions = {
    addContact ({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {email, name, content} = payload;
                const res = await this.$axios.post('http://localhost:4001/contact/addContact',{
                    email, name, content
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
    }
};
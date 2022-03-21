export const state = () => ({
    other : null,
    chats : null,
    newChatNum : 0,
});
export const mutations = {
    loadRoom(state,payload) {
        const {chats, other, newChatNum} = payload;
        state.chats = chats;
        state.other = other;
        state.newChatNum = state.newChatNum+newChatNum;
    },
    addChat(state, payload) {
        const {chats} = payload;
        state.chats = state.chats.concat(chats);
        state.newChatNum = state.newChatNum + chats.length;
    },
    updateNewChatNum(state, payload) {
        state.newChatNum = 0;
    },
    logout(state) {
        state.other = null;
        state.chats = null;
    },
};
export const actions = {
    loadRoom({commit}){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:6001/waitingRoom/loadRoom',{
                    withCredentials : true
                });
                const {chats, other, newChatNum, info} = res.data;
                if (info === 'loadRoom success: old user' || info === 'loadRoom success: new user') {
                    commit('loadRoom',{chats, other, newChatNum});
                    return resolve({info})
                }
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updateRoom({commit}, payload){
        return new Promise(async (resolve, reject) => {
            try {
                const {roomId, type} = payload;
                const res = await this.$axios.post('http://localhost:6001/privateChatRoom/updateRoom',{
                    roomId, type
                }, {
                    withCredentials : true
                });
                const {info} = res.data;
                commit('updateNewChatNum');
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    uploadChatImages({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {formData} = payload;
                const res = await this.$axios.post('http://localhost:6001/privateChatRoom/uploadChatImage',formData,{
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
    deleteChatImage({commit}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const {imageUrl} = payload;
                const res = await this.$axios.post('http://localhost:6001/privateChatRoom/deleteChatImage',{
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
    addChat({commit}, payload){
        return new Promise(async (resolve, reject) => {
            try {
                const {roomId, imageUrls, message} = payload;
                const res = await this.$axios.post('http://localhost:6001/privateChatRoom/addChat',{
                    roomId, imageUrls, message
                }, {
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
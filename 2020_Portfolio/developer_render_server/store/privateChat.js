export const state = () => ({
    other : null,
    room : null,
    chats : null,

    rooms : []
});
export const mutations = {
    loadRooms(state,payload) {
        const {rooms, allRoomChat, allNewChatNum} = payload;
        state.rooms = rooms;
    },
    loadSingleRoom(state,payload) {
        const {other, room, chats} = payload;
        state.chats = chats;
        state.room = room;
        state.other = other;
    },
    addChatRoom(state,payload) {
        const {room} = payload;
        state.rooms.push({'room' : room, 'lastChat' : '', 'newChatNum' : 0});
    },
    addChat(state, payload) {
        const {chats} = payload;
        state.chats = state.chats.concat(chats);
        //state.rooms[index].lastChat = chats[chats.length-1]
    },

    updateLastChat(state, payload) {
        const {chat, chatNum, roomId} = payload;
        state.rooms.forEach((room, index) => {
            if (room.room.id === roomId) {
                state.rooms[index].lastChat = chat;
                state.rooms[index].newChatNum = state.rooms[index].newChatNum + chatNum;
                return 0;
            }
        });
    },
    updateRoom(state, payload) {
        const {roomId, type} = payload;
        if (type === "manager") {
            state.rooms.forEach((room, index) => {
                if (room.room.id === roomId) {
                    state.rooms[index].newChatNum = 0;
                    return 0;
                }
            });
        }
    },

    logout(state) {
        state.other = null;
        state.chats = null;
        state.rooms = [];
        state.allRoomChat = [];
        state.allNewChatNum = [];
    },
};
export const actions = {
    loadRooms({commit}) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/waitingRoom/loadRooms',{
                    withCredentials : true
                });
                const {rooms, info} = res.data;
                commit('loadRooms',{rooms});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    loadSingleRoom({commit}, payload){
        return new Promise(async (resolve, reject) => {
            try {
                const {roomId} = payload;
                const res = await this.$axios.post('http://localhost:7001/waitingRoom/loadSingleRoom',{
                    roomId
                }, {
                    withCredentials : true
                });
                const {chats, other, room, info} = res.data;
                if (info === "loadSingleRoom success") {
                    commit('loadSingleRoom',{chats, room, other});
                }
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
                commit('updateRoom', {roomId, type});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
};
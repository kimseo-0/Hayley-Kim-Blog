<template>
    <v-dialog v-model="show" scrollable style="z-index:4; height: 100%;">
        <v-card flat height="100%" :width="this.$vuetify.breakpoint.name === 'md' || this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl' ? '40%' : '0%'" style="margin: 0; padding: 0; position: fixed; left: 0; top: 0">
            <v-card-title>
                <h3>CHATS</h3>
            </v-card-title>
            <v-card-subtitle>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details />
            </v-card-subtitle>
            <chat-rooms-component :rooms="rooms" :search="search"/>
        </v-card>
        <v-card flat tile height="100%" :width="this.$vuetify.breakpoint.name === 'md' || this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl' ? '60%' : '100%'" style="margin: 0; padding: 0; position: fixed; right: 0; top: 0">
            <v-card-title style="padding: 0;">
                <table style="z-index:1; width: 100%; height: 60px; background-color: rgb(144, 107, 255);">
                    <tr style="">
                        <td style="height: 100%; vertical-align: middle; color: white;">
                            <v-btn icon @click="close">
                                <v-icon large color='white'>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            {{other.nickName}}
                        </td>
                    </tr>
                </table>
            </v-card-title>
            <v-card-text style="height: 100%; padding: 0">
                <chat-component/>
            </v-card-text>
            <v-card-text style="padding: 0; height: 80px">
                <chat-form-component :me="me" :room-id="roomId"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import io from "socket.io-client";
    import ChatComponent from "../../components/Chat/ChatComponent";
    import ChatFormComponent from "../../components/Chat/ChatFormComponent";
    import ChatRoomsComponent from "../../components/Chat/ChatRoomsComponent";

    export default {
        name: "_roomId",
        components :{
            ChatRoomsComponent,
            ChatFormComponent,
            ChatComponent
        },
        data() {
            return {
                show : true,
                chatRoom: true,
                privateChatRoomSocket : null,
                roomId : parseInt(this.$route.params.roomId),
                search: '',

                myChat : false,
            }
        },
        computed : {
            me() {
                return this.$store.state.user.me;
            },
            other() {
                return this.$store.state.privateChat.other;
            },
            chats() {
                return this.$store.state.privateChat.chats
            },
            room() {
                return this.$store.state.privateChat.room;
            },
            rooms() {
                return this.$store.state.privateChat.rooms;
            },
        },
        methods : {
            close() {
                this.$router.push('/chats')
            },
            async connectSocket() {
                this.privateChatRoomSocket = await io.connect('http://localhost:6001/privateChatRoom', {
                    path: '/socket.io'
                });
                await this.privateChatRoomSocket.emit('joinPrivateChatRoom', {
                    roomId : this.roomId
                });
                this.privateChatRoomSocket.on('chat', async (data) => {
                    const {chats} = data;
                    await this.$store.commit('privateChat/addChat', {
                        chats
                    });
                    await this.$store.dispatch("privateChat/updateRoom",{
                        type: 'manager',
                        roomId: this.roomId,
                    });
                });
            },
            disconnectSocket() {
                this.privateChatRoomSocket.disconnect();
                this.privateChatRoomSocket = null;
                console.log(1);
            },
        },
        async fetch({store, params}) {
            const roomId = parseInt(params.roomId);
            try {
                await store.dispatch("privateChat/loadSingleRoom",{
                    roomId : roomId
                });
            } catch (e) {
                console.error(e);
            }
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "chatRoom"
            });
        },
        mounted() {
            if(this.me && !this.privateChatRoomSocket) {
                this.connectSocket();
            }
        },
        async updated() {
            if(this.me && !this.privateChatRoomSocket) {
                this.connectSocket();
            } else if(!this.me && (this.privateChatRoomSocket)) {
                this.disconnectSocket();
            }
        },
        async beforeDestroy() {
            if (this.privateChatRoomSocket) {
                this.disconnectSocket();
            }
            await this.$store.dispatch("privateChat/updateRoom",{
                type: 'manager',
                roomId: this.roomId,
            });
        }
    }
</script>

<style scoped>

</style>
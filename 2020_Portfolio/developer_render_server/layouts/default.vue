<template>
    <v-app style="width: 100%; background-color: white;">
        <div v-if="me && (page!=='postForm' && page !=='chatRoom')" style="z-index: 2; position: fixed; top:0; width: 100%">
            <v-tabs v-if="!isMobile" background-color="white" left grow height="50px" style="width: 100%">
                <v-tab to="/">
                    DASHBOARD
                </v-tab>
                <v-tab to="/profile">
                    PROFILE
                </v-tab>
                <v-tab to="/users">
                    USERS
                </v-tab>
                <v-tab to="/posts">
                    POSTS
                </v-tab>
                <v-tab to="/report">
                    REPORT
                </v-tab>
                <v-tab to="/contacts">
                    CONTACTS
                </v-tab>
                <v-tab to="/chats">
                    CHAT
                </v-tab>
                <div style="float: right">
                    <v-breadcrumbs style="padding: 0; height: 50px;">
                        <v-breadcrumbs-item>
                            <v-list-item-content style="padding: 0; height: 50px">
                                <v-btn icon small>
                                    <v-icon>mdi-bell</v-icon>
                                </v-btn>
                            </v-list-item-content>
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-item>
                            <v-list-item-content style="padding: 0; height: 50px">
                                <v-btn outlined rounded small @click="logout" style="padding: 0 25px">
                                    logout
                                </v-btn>
                            </v-list-item-content>
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
            </v-tabs>
            <v-tabs v-else  height="50px" style="width: 100%">
                <div style="overflow: auto; width: 100%; height: 100%">
                    <div style="float:left;">
                        <v-breadcrumbs style="padding: 0 5px; height: 50px">
                            <v-breadcrumbs-item>
                                <v-list-item-content style="padding: 0">
                                    <v-btn icon @click.stop="clickDrawer" style="">
                                        <v-icon>mdi-menu</v-icon>
                                    </v-btn>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-item>
                                <v-list-item-content style="padding: 0;">
                                    <v-btn icon to="/">
                                        <v-icon style="">mdi-home</v-icon>
                                    </v-btn>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                    <div style="float: right">
                        <v-breadcrumbs style="padding: 0; height: 50px;">
                            <v-breadcrumbs-item>
                                <v-list-item-content style="padding: 0; height: 50px">
                                    <v-btn icon small>
                                        <v-icon>mdi-bell</v-icon>
                                    </v-btn>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-item>
                                <v-list-item-content style="padding: 0; height: 50px">
                                    <v-btn outlined rounded small @click="logout" style="padding: 0 25px">
                                        logout
                                    </v-btn>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                </div>
            </v-tabs>
        </div>

        <v-content>
            <v-card v-if="!me" flat style="padding: 30px">
                <login-component/>
            </v-card>
            <v-card v-else flat>
                <div v-if="page!=='postForm' && page !=='chatRoom'" style="height: 55px;"></div>
                <nuxt/>
            </v-card>
        </v-content>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                color="rgb(156, 124, 249)"
                width="200px" >
            <navigation-drawer-component :page="page"/>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
    import LoginComponent from "../components/Default/LoginComponent";
    import NavigationDrawerComponent from "../components/Default/NavigationDrawerComponent";
    import io from "socket.io-client";

    export default {
        name: "default",
        components : {
            NavigationDrawerComponent,
            LoginComponent
        },
        data() {
            return {
                drawer: false,

                displayHeight : null,
                width : null,

                waitingRoomSocket: null,
            }
        },
        computed : {
            isMobile() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return true;
                    case 'sm':
                        return true;
                    case 'md':
                        return false;
                    case 'lg':
                        return false;
                    case 'xl':
                        return false;
                    default:
                        return true;
                }
            },
            page () {
                return this.$store.state.page;
            },
            type () {
                const page = this.$store.state.page;
                return page === "home";
            },
            theme () {
                const page = this.$store.state.page;
                if (page === 'developerPage') {
                    return "#F3F3F3";
                } else {
                    return "black";
                }
            },
            backGroundColor () {
                const page = this.$store.state.page;
                if (page === 'developerPage') {
                    return "white";
                } else {
                    return "black";
                }
            },
            me () {
                return this.$store.state.user.me;
            },
        },
        methods : {
            clickDrawer() {
                this.drawer = !this.drawer;
            },
            async logout() {
                await this.$store.dispatch('user/logout');
            },

            async connectSocket() {
                console.log('연결');
                this.waitingRoomSocket = await io.connect('http://localhost:6001/waitingRoom', {
                    path: '/socket.io'
                });

                this.waitingRoomSocket.on('updateLastChat', async (data) => {
                    const {chat, chatNum, roomId} = data;
                    await this.$store.commit('privateChat/updateLastChat', {
                        chat,
                        chatNum,
                        roomId
                    });
                });
                this.waitingRoomSocket.on('addChatRoom', async (data) => {
                    const {room} = data;
                    await this.$store.commit('privateChat/addChatRoom', {
                        room
                    });
                });
            },
            disconnectSocket() {
                if (this.waitingRoomSocket) {
                    console.log('삭제');
                    this.waitingRoomSocket.disconnect();
                    this.waitingRoomSocket = null;
                }
            }
        },
        created() {
        },
        mounted() {
            this.displayHeight = document.documentElement.clientHeight;
            this.width = document.documentElement.clientWidth;

            if(this.me && this.waitingRoomSocket === null) {
                this.connectSocket();
            }
        },
        async updated() {
            if(this.me && !this.waitingRoomSocket) {
                this.disconnectSocket();
                this.connectSocket();
            } else if(!this.me && this.waitingRoomSocket) {
                this.disconnectSocket();
            }
        },
        beforeDestroy() {
            if (this.waitingRoomSocket) {
                this.disconnectSocket();
            }
        }
    }
</script>

<style scoped>

</style>
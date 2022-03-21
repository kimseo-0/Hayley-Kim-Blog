<template>
    <v-app :class="this.type ? 'app-white' : 'app-black'">
        <div class="tabs-container">
            <v-tabs v-if="this.page === 'profile'" :background-color="theme" height="50px">
                <div>
                    <back-history :color="'black'"/>
                </div>
            </v-tabs>
            <v-tabs v-else-if="!isMobile" :background-color="theme" color="rgb(144, 107, 255)" :dark="theme==='black'" height="50px" left grow>
                <v-tab :class="this.type ? 'tab-white' : 'tab-black'" to="/">
                    <v-list-item>
                        <v-list-item-content>
                            <home-button-component :color="this.type ? 'white' : 'black'"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-tab>
                <v-tab :class="this.type ? 'tab-white' : 'tab-black'" to="/aboutMe">
                    about me
                </v-tab>
                <v-tab :class="this.type ? 'tab-white' : 'tab-black'" to="/projects">
                    project
                </v-tab>
                <div class="tab-container">
                    <v-card class="tab-left" :color="theme">
                        <v-tab :class="this.type ? 'tab-white' : 'tab-black'">
                            <github-button-component :href="'https://github.com/kimseo-0'"/>
                        </v-tab>
                    </v-card>
                    <v-card v-if="type" class="tab-right" :color="theme">
                        <v-breadcrumbs class="tab-right-items">
                            <v-breadcrumbs-item v-if="!me">
                                <v-list-item-content>
                                    <login-button-component :color="this.type ? 'white' : 'black'" @click="openLoginOverlay"/>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <sign-up-button-component :color="this.type ? 'white' : 'black'" @click="openSignUpOverlay"/>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-item v-else class="pointer" @click="goUserPage">
                                <v-list-item-avatar class="avatar-image-container" size="25px" color="white">
                                    <v-img :src="`http://localhost:4001/${me.avatarImageUrl}`"/>
                                </v-list-item-avatar>
                                <v-list-item-title>{{me.nickName}}</v-list-item-title>
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-item>
                                <v-list-item-content>
                                    <search-button-component :color="this.type ? 'white' : 'black'" @click="openSearchOverlay"/>
                                </v-list-item-content>
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-card>
                </div>
            </v-tabs>
            <v-tabs v-else :background-color="theme" :dark="theme==='black'" height="50px">
                <table class="tab-container">
                    <tr class="tab-container">
                        <td class="tab-left">
                            <menu-button-component :color="this.type ? 'white' : 'black'" @click="openDrawer"/>
                            <home-button-component :color="this.type ? 'white' : 'black'"/>
                        </td>
                        <td class="tab-right">
<!--                            <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch>-->
                            <search-button-component :color="this.type ? 'white' : 'black'" @click="openSearchOverlay"/>
                        </td>
                    </tr>
                </table>
            </v-tabs>
        </div>

        <search-overlay-component :color="'black'" :search-overlay="searchOverlay" @closeSearchOverlay="closeSearchOverlay"/>
        <login-overlay-component :color="'black'" :login-overlay="loginOverlay"  :displayHeight="displayHeight" @closeLoginOverlay="closeLoginOverlay" @openSignUpOverlay="openSignUpOverlay"/>
        <sign-up-overlay-component :color="'black'" :sign-up-overlay="signUpOverlay" :displayHeight="displayHeight" @closeSignUpOverlay="closeSignUpOverlay" @openLoginOverlay="openLoginOverlay"/>


        <v-content id="content">
            <v-card flat :color="backGroundColor" v-scroll="onScroll">
                <div class="page-offset-top"></div>
                <v-card class="banner-container" color="white" width="100%">
<!--                    <banner-component/>-->
                </v-card>
                <nuxt class="page-container"/>
            </v-card>
        </v-content>

        <v-btn v-show=false fixed absolute dark small color='blue' icon outlined fab bottom left @click="$vuetify.goTo(0)">
            <v-icon large>
                mdi-chevron-up
            </v-icon>
        </v-btn>

        <v-navigation-drawer
                class="left-navigation"
                v-model="drawer"
                color="rgb(156, 124, 249)"
                width="200px" absolute temporary>
            <navigation-drawer-component :me="me" :page="page" @openLoginOverlay="openLoginOverlay" @openSignUpOverlay="openSignUpOverlay" @goUserPage="goUserPage"/>
        </v-navigation-drawer>

<!--        <contact-button-component @openContactDrawer="openContactDrawer" @openLoginOverlay="openLoginOverlay"/>-->

        <v-dialog class="right-navigation-container" v-model="contactDrawer" scrollable>
            <v-card class="right-navigation" flat tile height="100%" :width="this.$vuetify.breakpoint.name === 'xs' ? '100%' : '500px'">
                <v-card-title class="navigation-top">
                    <contact-top-component @closeContactDrawer="closeContactDrawer"/>
                </v-card-title>
                <v-card-text class="navigation-middle">
                    <chat-component :contact-drawer="contactDrawer" @openLoginOverlay="openLoginOverlay"/>
                </v-card-text>
                <v-card-text class="navigation-bottom">
                    <chat-form-component v-if="me" :room-id="me.id" @openLoginOverlay="openLoginOverlay"/>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import BackHistory from "../components/BackHistory";
    import HomeButtonComponent from "../components/Button/HomeButtonComponent";
    import GithubButtonComponent from "../components/Button/GithubButtonComponent";
    import LoginButtonComponent from "../components/Button/LoginButtonComponent";
    import SearchButtonComponent from "../components/Button/SearchButtonComponent";
    import SearchOverlayComponent from "../components/Navigation/SearchOverlayComponent";
    import LoginOverlayComponent from "../components/Navigation/LoginOverlayComponent";
    import NavigationDrawerComponent from "../components/Navigation/NavigationDrawerComponent";
    import ContactButtonComponent from "../components/Button/ChatButtonComponent";
    import ContactInfoComponent from "../components/InfoComponent";
    import ContactTopComponent from "../components/Chat/ChatTopComponent";
    import ChatComponent from "../components/Chat/ChatComponent";
    import ChatFormComponent from "../components/Form/ChatFormComponent";
    import MenuButtonComponent from "../components/Button/MenuButtonComponent";
    import SignUpButtonComponent from "../components/Button/SignUpButtonComponent";
    import SignUpOverlayComponent from "../components/Navigation/SignUpOverlayComponent";
    import io from 'socket.io-client';
    import BannerComponent from "../components/BannerComponent";

    export default {
        name: "default",
        components : {
            BannerComponent,
            SignUpOverlayComponent,
            SignUpButtonComponent,
            MenuButtonComponent,
            ChatFormComponent,
            ChatComponent,
            ContactTopComponent,
            ContactInfoComponent,
            ContactButtonComponent,
            NavigationDrawerComponent,
            LoginOverlayComponent,
            SearchOverlayComponent,
            SearchButtonComponent,
            LoginButtonComponent,
            GithubButtonComponent,
            HomeButtonComponent,
            BackHistory
        },
        data() {
            return {
                searchOverlay: false,
                loginOverlay: false,
                signUpOverlay: false,
                drawer: false,
                contactDrawer: false,
                dialog: false,

                displayHeight: null,
                width: null,
                drawerHeight: '500px',

                privateChatRoomSocket: null,

                gitHubLinkAddress: '',

                switch1: true,
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
                return page === "home" || page === "aboutMe" || page === "posts" || page === "singlePost";
            },
            theme () {
                const page = this.$store.state.page;
                if (page === "profile") {
                    return "#F3F3F3";
                } else {
                    return "black";
                }
            },
            backGroundColor () {
                const page = this.$store.state.page;
                if (page === "profile") {
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
            openDrawer() {
                this.drawer = !this.drawer;
                this.contactDrawer = false;
                this.loginOverlay = false;
                this.signUpOverlay = false;
                this.searchOverlay = false;
            },
            openLoginOverlay() {
                this.drawer = false;
                this.contactDrawer = false;
                this.loginOverlay = true;
                this.signUpOverlay = false;
                this.searchOverlay = false;
            },
            openSignUpOverlay() {
                this.drawer = false;
                this.contactDrawer = false;
                this.loginOverlay = false;
                this.signUpOverlay = true;
                this.searchOverlay = false;
            },
            closeLoginOverlay() {
                this.loginOverlay = false;
            },
            closeSignUpOverlay() {
                this.signUpOverlay = false;
            },
            async openContactDrawer() {
                this.contactDrawer = true;
                this.drawer = false;
                this.loginOverlay = false;
                this.signUpOverlay = false;
                this.searchOverlay = false;
                const el = document.querySelector('#content');
                el.classList.add('lock');
                if (this.me) {
                    await this.$store.dispatch("privateChat/updateRoom",{
                        type: 'user',
                        roomId: this.me.id,
                    });
                }
            },
            async closeContactDrawer() {
                this.contactDrawer = false;
                const el = document.querySelector('#content');
                el.classList.remove('lock');
                if (this.me) {
                    await this.$store.dispatch("privateChat/updateRoom",{
                        type: 'user',
                        roomId: this.me.id,
                    });
                }
            },
            openSearchOverlay() {
                this.searchOverlay = true;
                this.loginOverlay = false;
                this.signUpOverlay = false;
                this.drawer = false;
                this.contactDrawer = false;
            },
            closeSearchOverlay() {
                this.searchOverlay = false;
            },
            goUserPage() {
                if (this.me) {
                    this.$router.push('/user')
                } else {
                    this.openLoginOverlay()
                }
            },
            goToTop() {
                window.scrollTo(0,0);
            },

            async connectSocket() {
                try {
                    console.log('연결')
                    this.privateChatRoomSocket = await io.connect('http://localhost:6001/privateChatRoom', {
                        path: '/socket.io'
                    });
                    await this.privateChatRoomSocket.emit('joinPrivateChatRoom', {
                        roomId : this.me.id
                    });
                    this.privateChatRoomSocket.on('chat', async (data) => {
                        const {chats} = data;
                        await this.$store.commit('privateChat/addChat', {
                            chats
                        });
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            disconnectSocket() {
                if (this.privateChatRoomSocket) {
                    console.log('삭제');
                    this.privateChatRoomSocket.disconnect();
                    this.privateChatRoomSocket = null;
                }
            },
            onScroll(e) {

            }
        },
        mounted() {
            this.displayHeight = document.documentElement.clientHeight;
            this.width = document.documentElement.clientWidth;
            this.drawerHeight = document.documentElement.clientHeight;

            if(this.me && this.privateChatRoomSocket===null) {
                this.connectSocket();
            }
        },
        updated() {
            if (this.me && this.privateChatRoomSocket===null) {
                this.disconnectSocket();
                this.connectSocket();
            } else if (!this.me && this.privateChatRoomSocket!==null) {
                this.disconnectSocket();
            }
        },
        beforeDestroy() {
            console.log('우왕ㅇ')
            if (this.privateChatRoomSocket) {
                this.disconnectSocket();
            }
        }
    }
</script>

<style scoped>
    body::-webkit-scrollbar {
        display: none;
    }

    .app-white {
        width: 100%;
        height: 100%;
        background-color: black;
    }
    .app-black {
        width: 100%;
        height: 100%;
        background-color: black;
    }
    .app-white::-webkit-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        display: none; /* Chrome, Safari, Opera*/
    }
    .app-black::-webkit-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        display: none; /* Chrome, Safari, Opera*/
    }

    .tabs-container {
        z-index: 3;
        position: fixed;
        top:0;
        width: 100%;
    }
    .tab-container {
        height: 100%;
        width: 100%;
        overflow: auto;
    }
    .tab-white {
        height: 100%;
        color: white;
    }
    .tab-black {
        height: 100%;
        color: black;
    }
    .tab-left {
        float: left;
        height: 100%;
    }
    .tab-right {
        float: right;
        height: 100%;
    }
    .tab-right-items {
        padding: 0px;
        height: 50px;
    }

    .banner-container {
        position: fixed;
        top:50px;
        z-index: 2;
    }
    .page-offset-top {
        height: 50px;
    }
    .page-container {
        height: 100%;
        width: 100%;
    }

    .left-navigation {
        position: fixed;
        left: 0;
        top: 0;
    }
    .right-navigation-container {
        z-index:4;
        height: 100%;
    }
    .right-navigation {
        margin: 0;
        padding: 0;
        position: fixed;
        right: 0;
        top: 0;
    }
    .navigation-top {
        padding: 0;
        z-index: 2;
    }
    .navigation-middle {
        height: 100%;
        padding: 0;
    }
    .navigation-bottom {
        padding: 0;
        height: 80px;
    }

    .avatar-image-container {
        border: white solid 2px;
    }

    .lock {
        position: fixed;
    }
    .pointer {
        cursor: pointer;
    }
</style>
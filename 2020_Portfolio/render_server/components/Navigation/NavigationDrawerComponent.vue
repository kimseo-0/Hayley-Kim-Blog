<template v-slot:prepend>
    <div>
        <v-list dense nav>
            <v-list-item v-if="!me" style="width: 100%;">
                <login-button-component style="width: 50%;" :color="'black'" @click="openLoginOverlay"/>
                <sign-up-button-component style="width: 50%;" :color="'black'" @click="openSignUpOverlay"/>
            </v-list-item>
            <v-list-item v-else style="width: 100%;" @click="goUserPage">
                <v-list-item-avatar size="40" color="#906BFF">
                    <v-img :src="`http://localhost:4001/${me.avatarImageUrl}`" alt="" style="width: 100%; height: 100%; background-color: white"/>
                </v-list-item-avatar>
                <v-list-item-content>
                    {{me.nickName}}
                </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <div style="margin: 5px 0">
                <v-list-item link to="/">
                    <v-list-item-title>
                        home
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link to="/aboutMe">
                    <v-list-item-title>
                        aboutMe
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link to="/projects">
                    <v-list-item-title>
                        projects
                    </v-list-item-title>
                </v-list-item>
            </div>
        </v-list>
    </div>
</template>

<script>
    import LoginButtonComponent from "../Button/LoginButtonComponent";
    import SignUpButtonComponent from "../Button/SignUpButtonComponent";
    export default {
        name: "NavigationDrawerComponent",
        components: {SignUpButtonComponent, LoginButtonComponent},
        props: {
            me: Object
        },
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
            openLoginOverlay() {
                this.$emit('openLoginOverlay');
            },
            openSignUpOverlay() {
                this.$emit('openSignUpOverlay');
            },
            goUserPage() {
                this.$emit('goUserPage');
            }
        }
    }
</script>

<style scoped>

</style>
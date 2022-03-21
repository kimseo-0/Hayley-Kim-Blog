<template>
    <v-card class="user-container" color="white" :dark=false flat tile>
        <v-row dense>
            <v-col v-if="!isMobile" cols="0" lg="2"></v-col>
            <v-col cols="12" lg="8">
                <div v-if="!me">잘못된 접근 경로 : 로그인을 하지 않은 사용자 입니다.</div>

                <div v-else>
                    <h3>PROFILE</h3>

                    <div class="user-form-container">
                        <user-form-component :me="me" :profile-form="profileForm" @cancelUpdateProfile="cancelUpdateProfile" />
                        <edit-button-component :profile-form="profileForm" @click="getProfileForm"/>
                    </div>

                    <v-divider/>

                    <div class="user-like-post-container">
                        <profile-like-post-component v-if="me.UserLikePosts" :user-like-posts="me.UserLikePosts"/>
                    </div>

                    <v-divider/>

                    <user-logout-button-component @click="logout"/>

                    <v-divider/>

                    <user-delete-button-component @click="deleteProfile"/>

                </div>
            </v-col>
            <v-col v-if="!isMobile" cols="0" lg="2"></v-col>
        </v-row>
    </v-card>
</template>

<script>
    import UserFormComponent from "../components/Form/UserFormComponent";
    import ProfileLikePostComponent from "../components/Post/UserLikePostComponent";
    import EditButtonComponent from "../components/Button/EditButtonComponent";
    import UserLogoutButtonComponent from "../components/Button/UserLogoutButtonComponent";
    import UserDeleteButtonComponent from "../components/Button/UserDeleteButtonComponent";

    export default {
        name: "profile",
        components : {
            UserDeleteButtonComponent,
            UserLogoutButtonComponent,
            EditButtonComponent,
            UserFormComponent,
            ProfileLikePostComponent
        },
        data() {
            return {
                profileForm : false,
                saveMe : this.me,
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
                        return true;
                    case 'lg':
                        return false;
                    case 'xl':
                        return false;
                    default:
                        return true;
                }
            },
            me (){
                return this.$store.state.user.me;
            }
        },
        methods : {
            getProfileForm() {
                this.profileForm = true;
            },
            cancelUpdateProfile() {
                this.profileForm = false;
            },
            async deleteProfile() {
                await this.$store.commit('privateChat/logout');
                await this.$store.dispatch('user/deleteProfile');
                alert("회원 탈퇴!");
                await this.$router.replace('/');
            },
            async logout() {
                await this.$router.replace('/');
                await this.$store.commit('privateChat/logout');
                await this.$store.dispatch('user/logout');
            }
        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "profile"
            });

            await this.$store.dispatch('user/loadMe');
            if(!this.me) {
                this.$router.replace('/')
                //info
            }
        },
    }
</script>

<style scoped>
    .user-container {
        padding: 40px 20px;
        width: 100%;
        height: 100%;
    }
    .user-form-container {
        padding: 20px 0;
    }
    .user-like-post-container {
        padding: 25px 0;
        clear: both
    }
</style>
<template>
    <v-overlay
            class="login-overlay"
            :value="loginOverlay"
            :color="this.$vuetify.breakpoint.name === 'xs' ? 'black' : 'white'"
            :opacity="this.$vuetify.breakpoint.name === 'xs' ? '1' : '0.8'"
            absolute z-index="3"
            @click="closeLoginOverlay" >
        <v-card class="login-overlay-card"
                :color="color"
                :width="this.$vuetify.breakpoint.name === 'xs' ? '100%' : '600px'"
                :height="this.$vuetify.breakpoint.name === 'xs' ? this.displayHeight : '100%'" >
            <div style="float: right">
                <close-button-component :color="'white'" @click="closeLoginOverlay"/>
            </div>
            <div class="login-overlay-button-container">
                <div class="login-overlay-login-button-container">
                    <login-component @closeLoginOverlay="closeLoginOverlay"/>
                </div>
                <div class="login-overlay-sign-up-button-container">
                    <sign-up-button-component class="login-overlay-sign-up-button" color="'white" @click="openSignUpOverlay"/>
                </div>
            </div>
        </v-card>
    </v-overlay>
</template>

<script>
    import LoginComponent from "../Form/LoginFormComponent";
    import CloseButtonComponent from "../Button/CloseButtonComponent";
    import LoginButtonComponent from "../Button/LoginButtonComponent";
    import SignUpButtonComponent from "../Button/SignUpButtonComponent";

    export default {
        name: "LoginOverlayComponent",
        props: {
            color: String,
            loginOverlay: Boolean,
            displayHeight: Number,
        },
        components : {
            SignUpButtonComponent,
            LoginButtonComponent,
            CloseButtonComponent,
            LoginComponent
        },
        data() {
            return {
            }
        },
        methods: {
            closeLoginOverlay() {
                this.$emit('closeLoginOverlay');
            },
            openSignUpOverlay() {
                this.$emit('openSignUpOverlay');
            },
        }
    }
</script>

<style scoped>
    .login-overlay {
        position: fixed;
        top: 0;
    }
    .login-overlay-card {
        border-radius: 5px;
        padding: 20px;
    }
    .login-overlay-button-container {
        padding: 0 10px;
        clear: both
    }
    .login-overlay-login-button-container {
        width: 100%;
    }
    .login-overlay-sign-up-button-container {
        overflow: auto;
    }
    .login-overlay-sign-up-button {
        float:right;
    }
</style>
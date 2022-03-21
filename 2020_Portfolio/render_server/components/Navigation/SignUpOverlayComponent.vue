<template>
    <v-overlay
            class="sign-overlay"
            :value="signUpOverlay"
            :color="this.$vuetify.breakpoint.name === 'xs' ? 'black' : 'white'"
            :opacity="this.$vuetify.breakpoint.name === 'xs' ? '1' : '0.8'"
            absolute z-index="3"
            @click="closeSignUpOverlay" >
        <v-card class="sign-overlay-card" :color="color"
                :width="this.$vuetify.breakpoint.name === 'xs' ? '100%' : '600px'"
                :height="this.$vuetify.breakpoint.name === 'xs' ? this.displayHeight : '100%'" >
            <div style="float: right">
                <close-button-component :color="'white'" @click="closeSignUpOverlay"/>
            </div>
            <div class="sign-overlay-button-container">
                <div class="sign-overlay-sign-up-button-container">
                    <sign-up-component @closeSignUpOverlay="closeSignUpOverlay"/>
                </div>
                <div class="sign-overlay-login-button-container">
                    <login-button-component class="sign-overlay-login-button" color="'white" @click="openLoginOverlay"/>
                </div>
            </div>
        </v-card>
    </v-overlay>
</template>

<script>
    import SignUpComponent from "../Form/SignUpFormComponent";
    import CloseButtonComponent from "../Button/CloseButtonComponent";
    import LoginButtonComponent from "../Button/LoginButtonComponent";
    import SignUpButtonComponent from "../Button/SignUpButtonComponent";

    export default {
        name: "SignUpOverlayComponent",
        props: {
            color: String,
            signUpOverlay: Boolean,
            displayHeight: Number,
        },
        components : {
            SignUpButtonComponent,
            LoginButtonComponent,
            CloseButtonComponent,
            SignUpComponent
        },
        data() {
            return {
            }
        },
        methods: {
            closeSignUpOverlay() {
                this.$emit('closeSignUpOverlay');
            },
            openLoginOverlay() {
                this.$emit('openLoginOverlay');
            }
        }
    }
</script>

<style scoped>
    .sign-overlay {
        position: fixed;
        top: 0;
    }
    .sign-overlay-card {
        border-radius: 5px;
        padding: 20px;
    }
    .sign-overlay-button-container {
        padding: 0 10px;
        clear: both
    }
    .sign-overlay-sign-up-button-container {
        width: 100%;
    }
    .sign-overlay-login-button-container {
        overflow: auto;
    }
    .sign-overlay-login-button {
        float:right;
    }
</style>
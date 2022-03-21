<template>
    <v-form v-model="valid" @submit.prevent="login" style="clear:both;">
        <v-row>
            <v-col v-show="info" cols="12">
                <v-alert dense outlined type="error" width="100%" >
                    {{info}}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="email"
                              :rules="emailRules"
                              color="white"
                              :autofocus = true :dense = true required single-line outlined
                              label="EMAIL"/>

                <v-text-field v-model="password"
                              :rules="passwordRules"
                              color="white"
                              :dense = true required single-line outlined
                              type="password"
                              label="PASSWORD" />
            </v-col>
            <v-col>
                <v-btn type="submit" width="100%" color="rgb(144, 107, 255)" style="color: black">
                    login
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "LoginFormComponent",
        data() {
            return {
                valid: false,

                email: '',
                password: '',

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'password is required',
                    v => v.length>10 || 'password must be valid',
                ],

                info : null,
            }
        },
        methods: {
            async login() {
                try {
                    const res = await this.$store.dispatch('user/developerLogin', {
                        email: this.email,
                        password: this.password
                    });
                    const {info} = res;
                    if (info === "developerLogin success") {
                        await this.$store.dispatch('loadReports');
                        await this.$store.dispatch('loadProfile');
                        await this.$store.dispatch('user/loadUsers');
                        await this.$store.dispatch('post/loadAllPosts');
                        await this.$store.dispatch('contact/loadContacts');
                        await this.$store.dispatch('privateChat/loadRooms');
                    } else {
                        alert(info);
                    }
                } catch (e) {
                    console.error(e);
                }
            },
        }
    }
</script>

<style scoped>

</style>
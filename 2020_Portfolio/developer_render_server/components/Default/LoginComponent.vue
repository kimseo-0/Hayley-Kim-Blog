<template>
    <v-card flat>
        <v-row>
            <v-col cols="12">
                관리자
                <div style="color: black; font-size: 30px;">LOGIN</div>
            </v-col>
            <v-col cols="12">
                <login-form-component/>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import LoginFormComponent from "./LoginFormComponent";
    export default {
        name: "LoginComponent",
        components: {LoginFormComponent},
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
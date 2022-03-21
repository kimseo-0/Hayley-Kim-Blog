<template>
    <v-snackbar
            v-model="alert"
            left bottom >

        {{ info }}

        <template v-slot:action="{ attrs }">
            <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    @click="closeAlert" >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        name: "AlertFloatingComponent",
        props: {
            info: String,
            alert: Boolean
        },
        data() {
            return {

            }
        },
        methods: {
            closeAlert() {
                this.$emit('closeAlert')
            }
        },
        mounted() {
            setTimeout(()=> {
                this.closeAlert();
            },2000)
        }
    }
</script>

<style scoped>

</style>
<template>
    <v-row>
        <v-col cols="12">
            <div style="margin-bottom: 20px">
                CONTACT INFO
            </div>
            <info-component/>
        </v-col>

        <v-col cols="12">
            <contact-form-component/>
        </v-col>
    </v-row>
</template>

<script>
    import InfoComponent from "../InfoComponent";
    import ContactFormComponent from "../Form/ContactFormComponent";

    export default {
        name: "ContactComponent",
        components: {ContactFormComponent, InfoComponent},
        data() {
            return {
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>
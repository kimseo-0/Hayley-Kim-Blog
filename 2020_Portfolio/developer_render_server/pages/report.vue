<template>
    <v-card flat style="padding: 20px; width: 100%">
        <v-card-title>
            <h3>REPORT</h3>
        </v-card-title>
        <v-card-subtitle>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details />
        </v-card-subtitle>
        <report-data-component :search="search" :reports="reports"/>
    </v-card>
</template>

<script>

    import ReportDataComponent from "../components/Report/ReportDataComponent";
    export default {
        name: "posts",
        components:{
            ReportDataComponent
        },
        data() {
            return {
                search: ''
            }
        },
        computed: {
            reports() {
                return this.$store.state.reports;
            }
        },
        methods: {
        },
        async created() {

            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
    }
</script>

<style scoped>

</style>
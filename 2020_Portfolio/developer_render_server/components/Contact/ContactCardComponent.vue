<template>
    <v-data-table
            :headers="headers"
            :items="contacts"
            :search="search"
            hide-default-footer>
        <template v-slot:item.state="{item}">
            <v-btn icon>
                <v-icon>{{item.state ? 'mdi-check-circle' : 'mdi-circle-outline'}}</v-icon>
            </v-btn>
        </template>
        <template v-slot:item.action="{item}">
            <v-btn icon>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "ContactCardComponent",
        props: {
            search: String,
            contacts: Array,
        },
        data() {
            return {
                headers: [
                    { text: 'Name', align: 'start', value: 'name' },
                    { text: 'email', value: 'email' },
                    { text: 'content', value: 'content' },
                    { text: 'state', value: 'state' },
                    { value: 'action' },
                ],
            }
        }
    }
</script>

<style scoped>

</style>
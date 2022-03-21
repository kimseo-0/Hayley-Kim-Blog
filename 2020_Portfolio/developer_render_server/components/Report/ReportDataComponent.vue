<template>
    <v-data-table
            :headers="headers"
            :items="reports"
            :search="search"
            hide-default-footer
            item-key="id" >
        <template v-slot:item.id="{item}">
            {{item.id}}
        </template>
        <template v-slot:item.userId="{item}">
            {{item.userId}}
        </template>
        <template v-slot:item.commentId="{item}">
            {{item.commentId}}
        </template>
        <template v-slot:item.commentUserId="{item}">
            {{item.Comment.userId}}
        </template>
        <template v-slot:item.comment="{item}">
            {{item.Comment.text}}
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "ReportDataComponent",
        props: {
            reports: Array,
            search: String
        },
        data() {
            return {
                headers: [
                    { text: 'Id', value: 'id'},
                    { text: 'text', value: 'text'},
                    { text: 'userId', value: 'userId'},
                    { text: 'commentId', value: 'commentId'},
                    { text: 'comment writer', value: 'commentUserId'},
                    { text: 'comment', value: 'comment'}
                ],
                expanded: [],
            }
        },
        methods: {
        },
    }
</script>

<style scoped>

</style>
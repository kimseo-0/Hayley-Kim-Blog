<template v-slot:prepend>
    <div>
        <div>
            <v-list dense nav>
                <v-list-item link to="/">
                    <v-list-item-content>
                        <v-list-item-title>dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item link to="/profile">
                    <v-list-item-content>
                        <v-list-item-title>profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item link to="/users">
                    <v-list-item-content>
                        <v-list-item-title>users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/posts">
                    <v-list-item-content>
                        <v-list-item-title>posts</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/report">
                    <v-list-item-content>
                        <v-list-item-title>report</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider/>
                <v-list-item link to="/contacts">
                    <v-list-item-content>
                        <v-list-item-title>contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/chats">
                    <v-list-item-content>
                        <v-list-item-title>chat</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavigationDrawer",
        props: {
            page: String
        },
        data() {
            return {
            }
        },
        computed: {
            me () {
                return this.$store.state.user.me;
            },
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
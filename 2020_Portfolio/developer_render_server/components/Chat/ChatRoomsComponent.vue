<template>
    <v-data-table
            :headers="headers"
            :items="rooms"
            :search="search"
            hide-default-header
            hide-default-footer >
        <template v-slot:item.id="{item}">
            {{item.room.Participants[0].id}}
        </template>
        <template v-slot:item.nickName="{item}">
            {{item.room.Participants[0].nickName}}
        </template>
        <template v-slot:item.avatar="{item}">
            <v-list-item-avatar size="25px" color="white" style="border: black solid 1px">
                <v-img :src="`http://localhost:4001/${item.room.Participants[0].avatarImageUrl}`"/>
            </v-list-item-avatar>
        </template>
        <template v-slot:item.chatNum="{item}">
            <v-badge
                    :content="item.newChatNum"
                    :hidden="item.newChatNum===0"
                    color="green"
                    left >
            </v-badge>
        </template>
        <template v-slot:item.lastChat="{item}">
            <div>
                <span v-if="item.lastChat.message">{{item.lastChat.message}}</span>
                <span v-else-if="item.lastChat.imageUrl" style="display: inline-block;">사진</span>
            </div>
        </template>
        <template v-slot:item.action="{item}">
            <v-btn icon @click="updateRoom(item.room.id)">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "ChatRoomsComponent",
        props : {
            rooms : Array,
            search : String
        },
        data() {
            return {
                headers:[
                    { text: 'id', align: 'start', value: 'id' },
                    { text: 'avatar', value: 'avatar' },
                    { text: 'nickName', value: 'nickName' },
                    { text: 'lastChat', value: 'lastChat' },
                    { text: 'chatNum', value: 'chatNum' },
                    { value: 'action' },
                ]
            }
        },
        computed : {
        },
        methods : {
            async updateRoom(roomId) {
                this.$router.push(`/chat/${roomId}`);
                await this.$store.dispatch('updateRoom', {
                    roomId,
                    type: 'manager'
                })
            }
        },
        created() {
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
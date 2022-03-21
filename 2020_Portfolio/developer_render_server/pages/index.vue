<template>
    <div>
        dashBoard
    </div>
</template>

<script>
    export default {
        name: "dashBoard",
        created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
    }
</script>

<style scoped>

</style>
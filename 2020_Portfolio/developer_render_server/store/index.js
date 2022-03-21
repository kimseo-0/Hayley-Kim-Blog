import Vue from 'vue'

export const state = () => ({
    returnUrl : '/',
    page : 'home',
});
export const mutations = {
    currentPage(state, payload) {
        const {currentPage} = payload;
        state.page = currentPage;
    },
};
export const actions = {
    async nuxtServerInit({state, dispatch}) {
        try {
            const res = await dispatch('user/checkDeveloper');
            const {info} = res;
            if(info === 'isDeveloper') {
                await Promise.all([
                    dispatch('report/loadReports').catch((e) => {return 0}),
                    dispatch('profile/loadProfile').catch((e) => {return 0}),
                    dispatch('user/loadUsers').catch((e) => {return 0}),
                    dispatch('post/loadAllPosts').catch((e) => {return 0}),
                    dispatch('contact/loadContacts').catch((e) => {return 0}),
                    dispatch('privateChat/loadRooms').catch((e) => {return 0}),
                ]);
            }
        } catch (e) {
            console.error(e);
        }
    },
};
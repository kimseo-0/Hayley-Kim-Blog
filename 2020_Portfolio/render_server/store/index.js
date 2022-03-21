export const state = () => ({
    returnUrl : '/',
    page : 'home',

    reports : []
});
export const mutations = {
    currentPage(state, payload) {
        const {currentPage} = payload;
        state.page = currentPage;
    }
};
export const actions = {
    async nuxtServerInit({state, dispatch}) {
        try {
            await Promise.all([
                dispatch('user/loadMe').catch((e) => {return 0}),
                dispatch('user/loadProfile').catch((e) => {return 0}),
                dispatch('post/loadPosts').catch((e) => {return 0}),
            ]);
            if (state.user.me) {
                await dispatch('privateChat/loadRoom');
            }
        } catch (e) {
            console.error(e);
        }
    }
};
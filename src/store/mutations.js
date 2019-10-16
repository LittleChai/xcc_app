const mutations = {
    addUserInfo(state,n) {
        return state.userInfo = n;
    },
    addUp(state,n) {
        state.routerUp.push(n);
    },
    addDown(state,n) {
        state.routerDown.push(n);
    },
    addPath(state,n) {
        state.routerPath = n;
    }

}
export default mutations;
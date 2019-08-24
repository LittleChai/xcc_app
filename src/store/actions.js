export const getUserInfo = ({commit}) => {
    commit('addUserInfo',localStorage.getItem('info'))
}
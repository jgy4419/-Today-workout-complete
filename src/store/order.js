export const Order = {
    namespaced: true,
    state: () => ({
        // 변수 명 넣기
        resPayment: 0,
    }),
    mutations: {
        paymentChange(state, {payment}){
            state.resPayment = payment;
        }
    },
    actions: {
        paymentAction(context, payload){
            const {payment} = payload;
            context.commit('paymentChange', {payment});
        }
    }
}
export const Community = {
    namespaced: true,
    state: () => ({
        categoryName: 'all',
        categoryState: 0,
        setPostState: 0, // 글 수정 버튼 누르면 1로 변경.
    }),
    mutations: {
        categoryNameChange(state, {categoryValue, count}){
            // actions에서 가져오면 카테고리 이름, 상태를 각각 지정해준다.
            state.categoryName = categoryValue;
            state.categoryState = count;
        },
        postStateChange(state, {value}){
            state.setPostState = value;
        }
    },
    actions: {
        categoryChange(context, payload){
            // 카테고리 이름, 카테고리 상태를 가져옴.
            const {categoryValue, count} = payload;
            context.categoryName = categoryValue;
            context.categoryState = count;
            // 카테고리 이름, 카테고리 상태를 mutations의 categoryNameChange에 객체 형식으로 전달.
            context.commit('categoryNameChange', {categoryValue, count});
        },
    }
}
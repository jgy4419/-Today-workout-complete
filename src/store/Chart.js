export const Chart = {
    namespaced: true,
    state: () => ({
        selectedChartName: '',
        chartState: 0,
        // 1이면 센서 2이면 찜목록
        chart_wishlist_state: 0,
    }),
    mutations: {
        selectedChart(state, { chartName, chartState }) {
            console.log(chartName);
            state.selectedChartName = chartName;
            state.chartState = chartState
        },
        wishlist_func(state, {wishlist_state}) {
            console.log(wishlist_state);
            state.chart_wishlist_state = wishlist_state;
        }
    },
}
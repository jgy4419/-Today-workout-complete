<template>
    <div class="contain">
        <p class="title">센서 데이터</p>
        <br/>
        <input v-model="dateValue" @change="changeDateTime()" type="date" class="calendar"/>
        <div class="charts">
            <Chart
            :key="dateState"
            :dateValue="propsDataValue"/>
        </div>
    </div>
</template>
<script>
import Chart from '../Chart.vue';
// import axios from 'axios';
export default {
    data(){
        return{
            emgDatas: [],
            propsDataValue: '',
            dateState: 0,
        }
    },
    methods: {
        changeDateTime() {
            // 날짜가 계속 변함으로 calemdar가 변할 때 마다 1씩 증가 시켜주기
            this.dateState++;
            this.propsDataValue = this.dateValue.replace(/-/gi, '');
        },
    },  
    components: {
        Chart
    }
}
</script>

<style lang="scss" scoped>
.contain {
    position: relative;
    width: 100%;
    height: 800px;
    bottom: 40px;
    .title{
        font-size: 30px;
        font-weight: 700;
    }
    .calendar{
        position: absolute;
        z-index: 10;
        width: 300px;
        height: 50px;
        border-radius: 10px;;
        font-size: 16px;
        padding: 10px;
        font-weight: 700;
    }
    .charts{
        margin-top: 8%;
    }
}
</style>
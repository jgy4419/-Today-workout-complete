<template>
  <div class="contain">
    <Spinner v-if="spinnerState === 1" class="spinner"/>
    <h1 class="done_chart_text" v-if="chartCount === 0">{{'차트가 없습니다.'}}</h1>
    <p v-if="postDetailChartState === 1"></p>
    <div class="inner" v-for="a, i in this.chart.chartId.length" :key="i">
      <p class="exerciseName">{{chart.data.exerciseName[i - 1]}}</p>
      <p class="date">{{chart.data.date[i - 1]}}</p>
      <div class="chartStyle">
        <p>{{emgDatas[i]}}</p>
        <canvas @click="$emit('clickedChart', selectChart(i))" class="chart" :id="chart.chartId[i]" width="80vw" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import Spinner from './Spinner.vue';
import axios from 'axios';
Chart.register(...registerables);
export default {
  components: { 
    Spinner
  },
  data(){
    return {
      spinnerState: 1,
      myChart: null,
      // 차트개수
      chartCount: 0,
      chart: {
        chartId: [],
        data: {
          date: [],
          nickname: '',
          // 운동 이름
          exerciseName: [],
          maximun_value_of_sets: 0,
          minimum_value_of_sets: 0,
          setsTime: '',
          setsCount:[],
          exerciseMinPower: 0,
          exerciseMaxPower: 0,
          // 운동한 근전도 센서 값 모두 가져오기.
          dataValues: [],
          // 몇 세트 했는지 숫자
          setCount: 0,
          // 차트 색
          chartColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
          postDetailChartState: 0,
        },
      },
      dataSets: [],
      emgDatas: [],
      postChartData: [],
      dataState: 0,
      filterChartArr: [],
    };
  },
  props:{
    // props로 Write페이지에서 보여졌는지, MyPage에서 보여졌는지 구분하는 변수
    readOrWrite: Number,
    getChartData: String,
    dateValue: String,
    dateState: Number
  },
  async mounted() {
    // let userInformation = JSON.parse(localStorage.getItem('userInformation'));
    let dataLength;
    // await axios.get('/api/sensorData', {params: {nickname: userInformation.nickname}})
    await axios.get('/api/sensorData', {params: {nickname: '얍'}})
      .then(res => {
        this.spinnerState = 0;
      // 로그인 된 닉네임으로 올린 근전도 센서 파일들 불러오기.
      for(let i = 0; i < res.data.length; i++){
        if (!res.data[i].emg_data_path.includes(this.dateValue)) {
          continue;
        }
        console.log('??');
        this.emgDatas.push(res.data[i].emg_data_path);        
      }
      dataLength = res.data.length;
      if(dataLength === 0){
        alert('데이터가 없습니다.');
      }
    })
      .catch(err => console.log(err))
    for (let i = 0; i < dataLength + 1; i++){
      // 차트가 하나도 없을 때 에러처리 (수정 필요)
      if (this.emgDatas === undefined) {
        alert('차트가 없습니다.');
        return;
      }
      this.getDatas(this.emgDatas, i);
    }
  },
  methods: {
    // 데이터 이름 들어감
    getDatas(datas, length) {
      this.chartCount = datas.length;
      console.log(this.chartCount);
      this.chart.chartId.push(`chart${length}`);
      import(`/root/TWC-BACKEND-BACKUP/public/emgData/${datas[length - 1]}`)
      .then(res => {
        let inChart = res;
        // 세트 수 넣어주기 (1세트부터 시작하므로 1부터 시작)
        for(let i = 0; i < res.number_of_sets; i++){
            this.chart.data.setsCount.push(`${i + 1}세트`);
        }
        // 세트 수
        this.chart.data.setCount = res.number_of_sets;
        // 운동 이름
        this.chart.data.exerciseName.push(res.workout_name);
        // 운동한 날짜
        this.chart.data.date.push(res.starting_time.substr(0, 8));
        console.log(this.chart.data.date.length);
        // 운동 전체 세트의 데이터가 들어감
        for(let i = 0; i < this.chart.data.setCount; i++){
          JSON.parse(inChart.sets[i].emg_data).forEach(element => {
            this.chart.data.dataValues.push(element)
          }); 
        }
        this.fillData(res, length);
      }).catch(err => {
        console.log(err)
      })
    },  
    fillData(data, length) {
      // 전체 개수에서 세트수 만큼 나눈 값 넣어주기.
      let setsData = [];
      let result = [];
      for(let i = 0; i < data.number_of_sets; i++){
        // setData에는 전체 세트의 emg 데이터 값 넣어줌
        setsData.push(JSON.parse(data.sets[i].emg_data));
      }
      // 전체 운동한 근전도 센서 값의 개수만큼 반복 세트당 10번 측정하므로 10씩 증가(변경할 수도 있음)
      for(let i = 0; i < setsData.length; i++){
        // result 값에 근전도 측정 값 전체 값의 10개씩 빼와서 result에 저장.
        result.push(setsData[i]);
      }
      let dataLists = [];
      let datasets = this.chart.data.dataValues;
      for (let j = 0; j < this.chart.data.setCount; j++){
        // console.log(result[j]);
        datasets = {
          label: this.chart.data.setsCount[j],
          // 반복할 때 마다 0번째 부터 불러온 한 파일당 불러온 데이터 수 만큼 자름.
          data: result[j],
          borderColor: this.chart.data.chartColor,
          fill: false 
        }
        dataLists.push(datasets);
      }
      // console.log(this.dataState);
      const ctx = document.getElementById(`chart${length}`).getContext('2d'); 
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000],
          datasets: dataLists
        },
        options: {
          title: {
            display: true,
            responsive: false,
            text: 'World population per region (in millions)'
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          }
        },
      });
    },
    // i는 클릭한 차트 위치를 가져옴.
    selectChart(i){
      return this.emgDatas[i];
    }
  }
}
</script>

<style lang="scss" scoped>
.contain{
  color: rgba(219, 252, 171, 0.2);
  .spinner{
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
  }
  .done_chart_text{
      margin-top: 20%;
      text-align: center;
      font-weight: 700;
      font-size: 30px;
      color: #93B5C6;
  }
  .inner{
    height: 400px;
    .exerciseName, .date{
      margin-top: 10%;
      font-weight: 700;
      font-size: 20px;
      color: #333;
    }
    .date{
      margin-top: 0;
    }
    .chartStyle{
      position: relative;
      width: 70vw;
      height: 300px;
      .chart{
        width: 80vw;
        height: 400px;
        cursor: pointer;
      }
    }
  }
  // 첫 번째 데이터 안 나와서.. 나중에 스타일 없이도 사라지게 수정하기.
  .inner:nth-child(1){
    display: none;
  }
  @media screen and (max-width: 768px){
    .done_chart_text{
      font-size: 20px;
      margin-top: 50%;
    }
    .inner{
      .exerciseName{
        margin-top: 35%;
      }
      .chartStyle{
        // width: 80vw;
        // height: 400px;
        #chart{
          width: 80vw;
          height: 400px;
        }
      }
    }
  }
}
</style>
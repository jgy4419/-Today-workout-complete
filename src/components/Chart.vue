<template>
  <div class="contain">
    <div class="inner" v-for="a, i in this.chart.chartId.length" :key="i">
      
      <p class="exerciseName">{{chart.data.exerciseName}}</p>
      <div class="chartStyle">
        <p>{{emgDatas[i]}}</p>
        <canvas class="chart" :id="chart.chartId[i]" width="80vw" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);
export default {
  data(){
    return{
      myChart: null,
      // 차트개수
      chartCount: 0,
      chart: {
        chartId: [],
        data: {
          nickname: '',
          // 운동 이름
          exerciseName: '',
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
        },
      },
      dataSets: [],
      emgDatas: [],
    };
  },
  async mounted(){
    let userInformation = JSON.parse(localStorage.getItem('userInformation'));
    let dataLength;
    await axios.get('/api/sensorData', {params: {nickname: userInformation.nickname}})
    .then(res => {
      // 로그인 된 닉네임으로 올린 근전도 센서 파일들 불러오기.
        for(let i = 0; i < res.data.length; i++){
          this.emgDatas.push(res.data[i].emg_data_path)
        }
        dataLength = res.data.length;
    })
    .catch(err => console.log(err))
    for(let i = 0; i < dataLength; i++){
      this.getDatas(this.emgDatas, i);
    }
  },
  methods: {
    getDatas(datas, length){
      this.chartCount = datas.length;
      this.chart.chartId.push(`chart${length}`);
      console.log(this.chart.chartId);
      import(`../../../Backend/public/emgData/${datas[length]}`)
      .then(res => {
        let inChart = res;
        // 세트 수 넣어주기 (1세트부터 시작하므로 1부터 시작)
        for(let i = 1; i < res.number_of_sets + 1; i++){
            this.chart.data.setsCount.push(`${i}세트`);
        }
        // 세트 수
        this.chart.data.setCount = res.number_of_sets;
        // 운동 이름
        this.chart.data.exerciseName = res.workout_name;
        // 운동 전체 세트의 데이터가 들어감
        for(let i = 0; i < this.chart.data.setCount; i++){
          JSON.parse(inChart.sets[i].emg_data).forEach(element => {
            this.chart.data.dataValues.push(element)
          });
        }
        this.fillData(res, length);
      }).catch(err => console.log(err))
    },  
    fillData(data, length){
      // 전체 개수에서 세트수 만큼 나눈 값 넣어주기.
      let setsData = [];
      console.log(data);

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
      for(let j = 0; j < this.chart.data.setCount; j++){
        datasets = {
          label: this.chart.data.setsCount[j],
          // 반복할 때 마다 0번째 부터 불러온 한 파일당 불러온 데이터 수 만큼 자름.
          data: result[j].slice(0, result[j].length),
          borderColor: this.chart.data.chartColor,
          fill: false 
        }
        dataLists.push(datasets);
      }
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
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.contain{
  color: rgba(219, 252, 171, 0.2);
  .inner{
    height: 400px;
    .exerciseName{
      font-weight: 700;
      font-size: 20px;
      color: #333;
    }
    .chartStyle{
      position: relative;
      width: 70vw;
      height: 300px;
      .chart{
        width: 80vw;
        height: 400px;
      }
    }
  }
  // 첫 번째 데이터 안 나와서.. 나중에 스타일 없이도 사라지게 수정하기.
  .inner:nth-child(1){
    display: none;
  }
  @media screen and (max-width: 768px){
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
</style>
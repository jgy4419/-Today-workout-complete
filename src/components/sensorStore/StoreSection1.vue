<template>
    <div class="storeContain">
        <div class="inner">
            <div class="content">
                <img class="productImg" :src="storeImg" alt="상품사진">
                <div class="information">
                    <h1 class="title">근육 측정기</h1>
                    <hr/>
                    <h3 class="select" v-for="productSelect, i in productSelect" :key="i"><span>{{productSelect}}</span> : {{changePrice[i]}} 원</h3>
                    <div class="sale">
                        <div class="sale-section">
                            <h3>근육 측정기</h3>
                            <div class="count">
                                <button @click="minusCount()">-</button><p>{{count}}</p><button @click="addCount()">+</button>
                            </div>
                        </div>
                        <button class="buyBtn">Buy now!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            storeImg: 'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/jev6tng0/b74a98afb6b64ee69c8e783cad9ceabb.jpg',
            productSelect: ['소비자가', '판매가'],
            price: ['35000', '30000'],
            changePrice: [],
            count: 0
        }
    },
    mounted(){
        // 정규표현식으로 숫자를 뒤에서 3자리마다 , 찍어주기.
        this.price.forEach(e => {
            this.changePrice.push(e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        })
    },
    methods: {
        addCount(){
            if(this.count === 10){
                this.count = 10;
            }
            this.count++;
        },
        minusCount(){
            if(this.count <= 0){
                alert('수량이 0개 입니다.');
                this.count = 1;
            }
            this.count--;
        }
    }
}
</script>

<style lang="scss" scoped>
.storeContain{
    .inner{
        width: 80vw;
        height: 500px;
        margin: auto;
        .content{
            width: 100%;
            margin: auto;
            display: flex;
            justify-content: space-around;
            .productImg{
                width: 400px;
            }
            .information{
                color: #333;
                .title{
                    font-weight: 700;
                }
                hr{
                    border: solid 1px rgb(234, 234, 234);
                    margin-bottom: 30px;
                }
                .select{
                    text-align: left;
                    font-weight: 600;
                    margin-bottom: 30px;
                    span{
                        color: rgb(209, 207, 207);
                    }
                }
                .sale{
                    position: relative;
                    align-items: center;
                    width: 30vw;
                    height: 200px;
                    background-color: rgb(248, 244, 244);
                    border-radius: 20px;
                    .sale-section{
                        position: relative;
                        padding: 20px;
                        h3{
                            margin-top: -5px;
                            font-weight: 700;
                        }
                        .count{
                            margin-top: 40px;
                            display: flex;
                            p{
                                // border: 1px solid #333;
                                background-color: #fff;
                                height: 30px;
                                width: 50px;
                                text-align: center;
                                padding-top: 5px;
                            }
                            button{
                                width: 40px;
                                height: 30px;
                                font-size: 20px;
                                background-color: #fff; 
                                // border: 1px solid #333;
                                border: 0;
                            }
                        }
                    }
                    .buyBtn{
                        position: absolute;
                        box-sizing: cover;
                        width: 100%;
                        height: 50px;
                        bottom: 0;
                        border: 0;
                        border-radius: 20px;
                        background-color: #C9CCD5;
                        font-weight: 700;
                        color: #fff;
                    }
                    .buyBtn:active{
                        background-color: #93B5C6;
                    }
                }
            }
        }
    }
}
</style>
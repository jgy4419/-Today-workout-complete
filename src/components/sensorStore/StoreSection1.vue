<template>
    <div class="storeContain">
        <div class="inner">
            <div class="content">
                <img class="productImg" :src="storeImg" alt="상품사진">
                <div class="information">
                    <h1 class="title">근육 측정기</h1>
                    <hr/>
                    <h3 class="select" v-for="productSelect, i in productSelect" :key="i"><span>{{productSelect}}</span> : {{changePrice[1]}} 원</h3>
                    <div class="sale">
                        <div class="sale-section">
                            <div class="sale-flex">
                                <div class="sale-left">
                                    <h3>근육 측정기</h3>
                                    <div class="count">
                                        <button @click="minusCount()">-</button>
                                        <p>{{count}}</p>
                                        <button @click="addCount()">+</button>
                                    </div>
                                </div>
                                <p class="resPrice">{{(price[1] * count).toLocaleString()}}원</p>
                            </div>
                        </div>
                        <button class="cartBtn" @click="cartIn()">장바구니에 담기</button>
                        <router-link :to="order">
                            <button class="buyBtn" @click="loginAuth()">Buy now!</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import product_img from '../../image/store/productImg.jpeg';
export default {
    data(){
        return{
            storeImg: product_img,
            productSelect: ['소비자가', '판매가'],
            price: ['35000', '30000'],
            changePrice: [],
            count: 0,
            // resPrice : this.price[1] * this.count,
            order: '/store/order'
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
        },
        loginAuth(){
            if(!localStorage.getItem('userInformation')){
                alert('로그인 후 구매 가능합니다.');
                this.order = '/login';
            }
            if(this.count === 0){
                alert('구매개수 최소 1개 이상 선택해주세요.');
            }
            this.$store.dispatch('Order/paymentAction', {
                payment: this.price[1] * this.count
            })
        },
        cartIn(){
            if(localStorage.getItem('userInformation') && this.count !== 0){
                alert('장바구니에 저장되었습니다!');
            }else {
                alert('개수 1개 이상 선택하거나, 로그인 후 이용 가능합니다.');
            }
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
                width: 40%;
                height: 40%;
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
                    height: 250px;
                    background-color: rgb(248, 244, 244);
                    border-radius: 20px;
                    .sale-section{
                        position: relative;
                        padding: 20px;
                        .sale-flex{
                            display: flex;
                            .resPrice{
                                position: absolute;
                                right: 30px;
                                top: 50px;
                                font-size: 30px;
                                font-weight: 600;
                            }
                        }
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
                    .cartBtn, .buyBtn{
                        // position: absolute;
                        margin-top: 10px;
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
                    .cartBtn{
                        background-color: rgb(209, 208, 208);
                        color: #fff;
                    }
                    .buyBtn:active{
                        background-color: #93B5C6;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 800px){
        .inner{
            .content{
                .productImg{
                    width: 50%;
                }
                .information{
                    .title{
                        font-size: 18px;
                    }
                    .sale{
                        width: 35vw;
                        height: 230px;
                        .sale-section{
                            .sale-flex{
                                .resPrice{
                                    font-size: 20px;
                                }
                                .sale-left{
                                    h3{
                                        font-size: 15px;
                                    }
                                    .count{
                                        p{
                                            width: 30px;
                                            height: 25px;
                                        }
                                        button{
                                            font-size: 15px;
                                            width: 20px;
                                            height: 25px;
                                        }
                                    }
                                }
                            }
                        }
                        .cartBtn, .buyBtn{
                            height: 40px;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 500px){
        .inner{
            height: 750px;
            .content{
                display: block;
                .productImg{
                    width: 100%;
                }
                .information{
                    .sale{
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="orderContain">
        <div class="inner">
            <h1 class="title">주문 결제</h1>
            <hr/>
            <div class="userBox">
                <div class="changeInput" v-if="changeState === 0">
                    <div class="inner">
                        <span>이름</span><input v-model="user.name" type="text" :placeholder="user.name"><br/>
                        <span>번호</span><input v-model="user.tel" :placeholder="user.tel" type="tel"><br/>
                    </div>
                </div>
            </div>
            <SearchAddress/>
            <div class="request">
                <span class="requestTitle">배송 요청사항</span>
                <input class="requestMessage" placeholder="배송 요청사항을 적어주세요." type="text"/>
            </div>
            <hr/>
            <div class="orderProduct">
                <h4>주문상품</h4>
                <div class="product">
                    <div class="productImg"/>
                    <div class="productInfo">
                        <h4>근육 측정기</h4>
                        <p>{{changePayment}} 원</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="payment">
                <h4>결제수단</h4>
                <div class="paymentCheck" v-for="checkboxs, i in checkbox.length" :key="i">
                    <span class="paymentText">{{checkbox[i]}}</span><input type="checkbox" name="checkedValue" />
                </div>
            </div>
            <hr/>
            <div class="finalPayment">
                <span>최종 결제 금액</span> <span class="resPayment">{{changePayment}}</span>
            </div>
            <!-- 누르면 결제 API 열리게 하기 -->
            <button class="orderBtn">결제하기</button>
        </div>
    </div>
</template>

<script>
import SearchAddress from './SearchAddress.vue';
import productImg from '../../image/store/productImg.jpeg';
export default {
    data(){
        return{
            user: {
                name: '',
                tel: '',
            },
            changeState: 0,
            checkbox: ['네이버', '신용/체크카드', '무통장 입급', '휴대폰 결제'],
            resPayment: this.$store.state.Order.resPayment,
            changePayment: '',
            productImg,
        }
    },
    mounted(){
        // alert(productImg)
        this.changePayment = this.resPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // 새로고침 시 가격이 0원이 되는데 그렇게 되면 페이지 뒤로가도록 하기.
        if(this.changePayment == 0){
            this.$router.go(-1);
        }
        let user = JSON.parse(localStorage.getItem('userInformation'));
        // localstorage의 userInformation에 유저 이름 넣고 가져오기.
        this.user.name = user.nickname;
        this.user.tel = user.phonenumber;
    },
    components: {
        SearchAddress
    },
    methods: {
        changeComplete(){
            this.changeState = 0;
            console.log();
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    width: 300px;
    height: 40px;
    padding: 10px;
    margin: 10px 10px;
    border-radius: 5px;
    border: solid 1px rgb(209, 209, 209);
}
.orderContain{
    width: 100vw;
    height: 700px;
    display: flex;
    // background-color: rgb(246, 246, 246);
    .inner{
        position: relative;
        width: 50vw;
        margin: auto;
        // text-align: center;
        .title{
            text-align: left;
        }
        .userBox{
            width: 100%;
            height: 150px;
        }
        .request{
            .requestTitle{
                font-size: 18px;
                margin-right: 20px;
            }
            .requestMessage{
            }
        }
        .orderProduct{
            .productImg{
                background-image: url('https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/jev6tng0/b74a98afb6b64ee69c8e783cad9ceabb.jpg');
                background-size: cover;
                width: 150px;
                height: 150px;
            }
            .product{
                display: flex;
                position: relative;
                .productInfo{
                    margin: 30px 20px;
                }
            }
        }
        .payment{
            position: relative;
            width: 400px;
            .paymentCheck{
                display: flex;
                justify-content: space-between;
                .paymentText{
                    font-size: 16px;
                    font-weight: 600;
                    margin-top: 20px;
                    color: rgb(185, 185, 185);
                }
                input {
                    width: 20px;
                    height: 20px;
                }
            }
        }
        .finalPayment{
            font-weight: 600;
            margin-bottom: 30px;
            span:nth-child(1){
                font-size: 20px;
            }
            span:nth-child(2){
                font-size: 30px;
                margin: 20px;;
            }
        }
        .orderBtn{
            width: 300px;
            height: 50px;
            border-radius: 10px;
            font-size: 20px;
            border: 0;
            background-color: #C9CCD5;
            color: #fff;
            margin-bottom: 20px;
        }
        .orderBtn:active{
            background-color: #93B5C6;
        }
    }
}
</style>
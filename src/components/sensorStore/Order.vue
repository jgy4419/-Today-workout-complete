<template>
    <div class="orderContain">
        <div class="inner">
            <div class="userInformation">
                <h4>주문자 정보</h4>
                <p>이름 : {{user.name}} {{user.tel}}</p>
                <button @click="changeState = 1">변경하기</button>
            </div>
            <div class="changeInput" v-if="changeState === 1">
                <div class="inner">
                    <span>이름</span><input v-model="user.name" type="text" :placeholder="user.name"><br/>
                    <span>번호 </span><input v-model="user.tel" :placeholder="user.tel" type="tel"><br/>
                    <button @click="changeComplete()">변경완료</button>
                </div>
            </div>
            <SearchAddress/>
            <div class="request">
                <span class="requestTitle">배송 요청사항</span>
                <input class="requestMessage" placeholder="배송 요청사항을 적어주세요." type="text"/>
            </div>
            <div class="payment">
                <h4>결제수단</h4>
            </div>
            <div class="finalPayment">
                <span>최종 결제 금액</span> <span>32,000원</span>
            </div>
            <!-- 누르면 결제 API 열리게 하기 -->
            <button>주문하기</button>
        </div>
    </div>
</template>

<script>
import SearchAddress from './SearchAddress.vue';
export default {
    data(){
        return{
            user: {
                name: '',
                tel: '',
            },
            changeState: 0,
            // btnState: 1,
        }
    },
    mounted(){
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
    border-radius: 5px;
    border: 0;
}
.orderContain{
    width: 100vw;
    height: 700px;
    display: flex;
    background-color: rgb(246, 246, 246);
    .inner{
        position: relative;
        width: 50vw;
        margin: auto;
        text-align: center;
        .request{
            .requestTitle{
                font-size: 18px;
                margin-right: 20px;
            }
            .requestMessage{
            }
        }
    }
}
</style>
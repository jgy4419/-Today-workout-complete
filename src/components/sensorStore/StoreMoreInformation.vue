<template>
    <div class="moreInformationContain">
        <div class="inner">
            <ul class="menuSelects">
                <li @click="textColor(i)" v-for="menuSelect, i in menuSelect" :key="i" class="menuSelect">{{menuSelect}}</li>
            </ul>
            <div class="saleInformation">
                <p>상품 준비중입니다!</p>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            menuSelect: ['상세정보', '배송/교환/환불', '상품조회', '상품문의'],
        }
    },
    methods: {
        // 클릭한 부분만 색 변하게 만들어주기.
        textColor(e){
            const menuSelect = document.querySelectorAll('.menuSelect');
            for(let i = 0; i < menuSelect.length; i++){
                menuSelect[i].style.color = 'lightgray';
                menuSelect[e].style.color = '#333'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.moreInformationContain{
    .inner{
        width: 80vw;
        height: 70vh;
        margin: auto;
        .menuSelects{
            display: flex;
            justify-content: space-around;
            border-top: 1px solid rgb(218, 212, 212);
            padding-top: 10px;
            .menuSelect{
                height: 30px;
                font-size: 20px;
                font-weight: 600;
                cursor: pointer;
                color: lightgray;
            }
            .menuSelect:nth-child(1){
                color: #333;
            }
        }
        .saleInformation{
            width: 100%;
            height: 100vh;
            // background-color: #333;
            margin-top: 50px;
            p{
                padding-top: 50px;
                font-size: 30px;
                font-weight: 700;
                text-align: center;
            }
        }
    }
}
</style>
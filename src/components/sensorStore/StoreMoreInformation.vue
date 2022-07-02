<template>
    <div class="moreInformationContain">
        <div class="inner">
            <ul class="menuSelects">
                <li v-for="menuSelect in menuSelect" :key="menuSelect" class="menuSelect">{{menuSelect}}</li>
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
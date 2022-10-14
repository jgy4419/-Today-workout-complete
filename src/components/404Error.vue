<template>
    <div class="container">
        <div class="text">
            <p class="text1">Error 404!</p>
            <p class="text2">URL 주소가 잘 못 되었습니다!</p>
        </div>  
        <Footer class="footer"/>
    </div>    
</template>

<script>
import Footer from './Footer.vue';
export default {
    components: {
        Footer
    }
}
</script>


<style lang="scss" scoped>
.container{
    width: 100vw;
    height: 89vh;
    .text{
        width: 90%;
        margin: auto;
        text-align: center;
        .text1{
            padding-top: 20%;
            font-size: 50px;
            font-weight: 900;
            color: #93B5C6;
        }
        .text2{
            font-size: 40px;
            font-weight: 700;
            color: #333;
        }
        @media screen and (max-width: 500px){
            .text1{
                padding-top: 20%;
                font-size: 30px;
                font-weight: 900;
                color: #93B5C6;
            }
            .text2{
                font-size: 20px;
                font-weight: 700;
                color: #333;
            }
        }
    }
    .footer{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
    }
}
</style>
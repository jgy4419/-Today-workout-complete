<template>
    <div class="contain">
        <header class="head">
            <div class="backImage"/>
            <div class="headerInner">
                <p class="mainText">
                    <span class="importantText">오</span>늘 <span class="importantText">운</span>동 <span class="importantText">완</span>료했니?
                </p>
            </div>
        </header>
        <br/>
        <section class="section">
            <div class="sectionInner">
                <p class="introductionTitle">페이지 소개</p>
                <hr/>
                <div class="introduction1">
                    저희 <span class="importantText">오운완</span>은 <b>"오늘 운동 완료했니?"</b> 의 줄임말로, 사용자들이 오늘은 어떤 운동을 했는지 기록하고 공유하는 사이트입니다. <br/><br/>
                    처음에 운동하기 어려워하는 사람들은 회원들이 어떻게 운동을 했는지나 노하우 등을 서로 공유하면서 <b>"모든 사람들이 운동을 쉽게 도전 가능"</b> 하도록 하는 것이 목표입니다. <br/>
                </div>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped>
.contain{
    .head{
        position: relative;
        width: 100vw;
        height: 300px;
        .backImage{
            margin-top: 20px;
            position: absolute;
            z-index: 1;
            background-image: url('https://thumb.zumst.com/530x0/https:/static.news.zumst.com/images/132/2021/12/27/546720b89eff47ca8e7f1bc5b28f3ccc.jpg');
            background-size: cover;
            background-repeat: no-repeat;   
            filter: invert(30%);
            width: 100vw;
            height: 100%;
            opacity: 0.9;   
        }
        .headerInner{
            position: relative;
            z-index: 10;
            padding-top: 5%;
            width: 700px;
            margin: auto;
            .mainText{
                font-size: 40px;
                font-weight: 700;
                color: #fff;
                text-align: center;
            }
            .importantText{
                color: rgb(212, 235, 254);
            }
        }
    }
    .section {
        margin-top: 20px;
        position: relative;
        width: 100vw;
        height: 300px;
        .sectionInner{
            width: 800px;
            margin: auto;
            .introductionTitle{
                text-align: center;
                font-size: 25px;
                font-weight: 700;
            }
            .introduction1{
                line-height: 2;
                font-weight: 500;
                font-size: 20px;
            }
        }
    }
    @media screen and (max-width: 800px){
        .head{
            .headerInner{
                width: 400px;
                .mainText{
                    font-size: 35px;
                    margin-top: 10%;
                }
            }
        }
        .section{
            height: 300px;
            .sectionInner{
                width: 400px;
                .introductionTitle{
                    font-size: 20px;
                }
                .introduction1{
                    font-size: 15px;
                }
            }
        }
    }
    @media screen and (max-width: 400px){
        .head{
            height: 200px;
            .headerInner{
                width: 100%;
                height: 100px;
                .mainText{
                    font-size: 20px;
                }
            }
        }
        .section{
            height: 400px;
            .sectionInner{
                width: 250px;
                .introductionTitle{
                    font-size: 20px;
                }
                .introduction1{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
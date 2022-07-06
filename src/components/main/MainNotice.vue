<template>
    <div class="contain">
        <div class="inner">
            <div class="noticeHead">
                <p class="noticeTitle">오운완 공지</p>
                <div class="line"/>
                <ul class="noticeList">
                    <li class="noticeItem" @click="activate"
                    v-for="noticeList in noticeList" :key="noticeList">{{noticeList}}</li>
                </ul>
            </div>
            <div class="noticeSectionBox">
                <div class="noticeSection"
                v-for="itemList, i in noticeItem.title.length" :key="i">
                    <p class="itemTitle">
                        {{noticeItem.title[i]}}
                    </p>
                    <hr>
                    <p class="itemContent">
                        {{noticeItem.content[i]}}
                    </p>
                </div>
            </div>
            <router-link to="/community">
                <p class="moreBtn">더 보기</p>
            </router-link>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            noticeList: ['전체', '공지', '운동'],
            noticeItem: {
                title: ['놓칠 수 없는 첫 회원 이벤트', '같이 운동 하자!', '운동량 측정 해볼래?'],
                content: ['첫 회원가입 시 추첨을 통해 선물 지급!', '사람들과 소통하면서 운동 방법을 공유할 수 있는 커뮤니티 생성!', '실제 자신이 운동한 운동량을 측정하고, 사람들한테 공유해보세요.']
            }
        }
    },
    mounted(){
        // 처음에 공지 부분에 전체 부분에 파란색 띄워놓기.
        document.querySelectorAll('.noticeItem')[0].classList.add('active');
    },
    methods: {
        activate({target}){
            console.log(target);
            let noticeItem = document.querySelector('.noticeList');
            [...noticeItem.children].forEach(info => {
                info.classList.toggle('active', info === target);
                
            })

        }
    }
}
</script>


<style lang="scss" scoped>
.contain{
    width: 100vw;
    // background-color: #333;
    .inner{
        width: 80%;
        margin: auto;
        .noticeHead{
            display: flex;
            justify-content: space-between;
            .noticeTitle{
                color: #93B5C6;
                font-size: 23px;
                font-weight: 900;
            }
            .line{
                width: 50vw;
                height: 1px;
                background-color: rgb(192, 192, 192);
                margin-top: 15px;
                margin-left: 3%;
            }
            .noticeList{
                display: flex;
                li{
                    color: rgb(123, 123, 123);
                    margin-left: 20px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                }
                li.active{
                    color: #93B5C6;
                }
            }
        }
        .noticeSectionBox{
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            .noticeSection{
                cursor: pointer;
                box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
                width: 25vw;
                height: 200px;
                padding: 20px;
                border-radius: 20px;
                transform: translateY(0);
                transition: .3s;
                .itemTitle{
                    font-size: 20px;
                    font-weight: 700;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
                .itemContent{
                    font-size: 16px;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
            }
            .noticeSection:hover{
                transition: .3s;
                transform: translateY(-10px);
            }
        }
        .moreBtn{
            position: absolute;
            z-index: 10;
            cursor: pointer;
            font-weight: 700;
            right: 10%;
            margin-top: 25px;
        }
    }
    @media screen and (max-width: 1200px){
        .inner{
            .noticeHead{
                .line{
                    width: 40vw;
                }
            } 
        }
    }
    @media screen and (max-width: 1000px){
        .inner{
            .noticeHead{
                .noticeTitle{
                    font-size: 20px;
                }
                .noticeList li{
                    font-size: 14px;
                }
            } 
            .noticeSectionBox{
                display: block;
                .noticeSection{
                    width: 100%;
                    height: 150px;
                    margin-top: 30px;
                }
            }
        }
    }
    @media screen and (max-width: 800px){
        .inner{
            .noticeHead{
                .line{
                    // width: 30vw;
                    display: none;
                }
                .noticeTitle{
                    font-size: 18px;
                }
                .noticeList li{
                    font-size: 12px;
                }
            }   
            .noticeSectionBox .noticeSection{
                .itemTitle{
                    font-size: 18px;
                }
                .itemContent{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
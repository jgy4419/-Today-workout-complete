<template>
    <div>
        <i @click="likeClick()" class="fa fa-heart likeAndShareBtn"></i>
        <span class="likeCount">{{like.count}}</span>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            like: {
                users: [],
                count: 0
            }
        }
    },
    async mounted() {
        console.log(this.$route.params.board);
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        await axios.get('/api/likePostWho', {
            params: {post_id: this.$route.params.post}
        }).then(res => {
            console.log(res.data);
            if(res.data === 'failure'){
                this.like.count = 0;
            }else{
                for(let i = 0; i < res.data.length; i++){
                    this.like.users.push(res.data[i].nickname);
                    if(res.data[i].nickname === userInformation.nickname){
                        document.querySelector('.likeAndShareBtn').style.backgroundColor = 'lightgrey';
                        document.querySelector('.likeAndShareBtn').style.color = 'grey';
                    }
                }
                this.like.count = this.like.users.length;
            }
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        likeWho(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            axios.get('/api/likePostWho', {
                params: {post_id: this.$route.params.post}
            }).then(res => {
                for(let i = 0; i < res.data.length; i++){
                    this.like.users.push(res.data[i].nickname);
                    if(res.data[i].nickname === userInformation.nickname){
                        document.querySelector('.likeAndShareBtn').style.backgroundColor = 'lightgrey';
                        document.querySelector('.likeAndShareBtn').style.color = 'grey';
                    }
                }
                this.like.users = this.like.users.filter(user => user !== undefined);
                this.like.count = this.like.users.length;
            }).catch(err => {
                console.log(err);
            })
        },
        likeClick(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            // 좋아요한 사람들의 배열에 로그인한 닉네임이 포함되어있지 않은 경우 플러스
            if (!this.like.users.includes(userInformation.nickname)) {
                // if (this.$route.params.board === 2) {
                    // 운동 게시판의 게시물이면 다른 api 요청받기
                // }
                axios.post('/api/likesPlus', {
                    post_id: this.$route.params.post,
                    nickname: userInformation.nickname
                }).then(res => {
                    console.log(res);
                })
            // 반대일 때 마이너스
            } else {
                // if (this.$route.params.board === 2) {
                    // 운동 게시판의 게시물이면 다른 api 요청받기
                // }
                axios.delete('/api/likesMinus', {
                    params: {
                        post_id: this.$route.params.post,
                        nickname: userInformation.nickname
                    }
                }).then(res => {
                    console.log(res);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .likeAndShareBtn {
        cursor: pointer;
        margin-top: 20px;
        font-size: 23px;
        color: #C9CCD5;
        background-color: rgb(238, 237, 237);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 20px;
        padding: 9px;
    }
    .likeCount {
        font-size: 14px;
        margin-left: 10px;
        margin-bottom: 10px;
        color: #93B5C6;
    }
    @media screen and (max-width: 800px){
        .likeAndShareBtn{
            font-size: 18px;
            width: 35px;
            height: 35px;
        }
    }
</style>
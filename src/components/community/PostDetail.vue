<template>
    <div class="contain">
        <div class="detail">
            <div class="postHeader">
                <div class="postImg" :style="{backgroundImage:`url('http://118.67.132.81:3000/img/postPhoto/${getPostDetailData.photographic_path}')`}"/>
                <div class="user">
                    <p class="title">{{getPostDetailData.title}}</p>
                    <br/>
                    <div class="information">
                        <p class="id">{{getPostDetailData.nickname}}</p>
                        <p class="date">{{dayJS(getPostDetailData.creation_datetime).format("YYYY-MM-DD")}}</p>
                    </div>
                    <div class="setPost">
                        <p @click="setPost()">수정</p>
                        <p @click="deletePost()">삭제</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner">
            <Like :key="likeState" @click="likeStateFunc()"/>
            <!-- <i  @click="likeClick()" class="fa fa-heart likeAndShareBtn"></i> -->
            <i class="fa fa-share-square likeAndShareBtn" @click="shareState = 1"></i>
            <div class="shares" v-if="shareState === 1">
                <p class="close" @click="shareState = 0">x</p>
                <p class="share" @click="fn_sendFB(`${btn.shares[i]}`)"
                v-for="share, i in btn.shares.length" :key="i">{{btn.shares[i]}}</p>
            </div>
            <p id="preview-click"></p>
                <GetChart :getChartData="getPostDetailData.chartname" v-if="getChartState === 1"/>
            <hr>
            <div class="commentList">
                <div class="comments" v-for="data, i in getCommentData.length" :key="i">
                    <div v-if="commentsEditState[i] === 1" class="commentSetBox">
                        <p @click="commentEdit(i)">수정</p>
                        <p @click="commentDelete(i)">삭제</p>
                    </div>
                    <p class="commentUserId">{{getCommentData[i].nickname}}</p>
                    <p v-if="commentState === 1" class="commentTitle">{{getCommentData[i].content}}</p>
                    <div class="inputSetCommentBox">
                        <textArea type="text" minlength="10" maxlength="100" size="10" class="inputSetComment"/>
                        <button @click="setCommentComplete(i)" class="setBtn setcomplete">수정완료</button>
                        <button @click="commentBack(), commentState = 1" class="setBtn notSet">돌아가기</button>
                    </div>
                    <div class="line"/>
                </div>
            </div>
            <hr/>
            <div class="comment">
                <label class="commentLabel" for="commentInput">댓글 쓰기</label><br/><br/>
                <div class="commentBox">
                    <textarea type="text" v-model="commentInput" placeholder="댓글을 입력해주세요." id="commentInput"/> <br/><br/>
                    <button class="btn" @click="commentUpdate()">게시</button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs';
import GetChart from './GetChart.vue';
import Like from './Like.vue';
export default {
    components: {
        GetChart,
        Like
    },
    data(){
        return{
            likeState: 0,
            getPostDetailData: [],
            getCommentData: [],
            commentsEditState: [],
            commentInput: '',
            // 사용자가 차트 데이터를 올렸는지 안 올렸는지 상태. (일단 임시로 1 적용.)
            chartState: 0,
            commentState: 1,
            dayJS: dayjs,
            btn: {
                shares: ['kakao', 'instagram', 'facebook']
            },
            shareState: 0,
            getChartState: 0,
        }
    },
    async mounted(){
        if(!localStorage.userInformation){
            alert('로그인 후 상세보기가 가능합니다!');
            location.replace('/login');
        }
        if(this.$route.params.board == 2){
            this.chartState = 1;
        }
        await axios.post('/api/viewPlus', {
            post_id: this.$route.params.post
        }).then(res => {
            console.log('조회수', res);
        }).catch(err => {console.log(err)});
        // 자신이 올린 게시물만 수정/삭제 가능.
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        const setPost = document.querySelector('.setPost');
        if(userInformation.nickname === this.$route.params.id){
            setPost.style.display = 'flex';
        }else if(userInformation.nickname !== this.$route.params.id){
            setPost.style.display = 'none';
        }
        await axios.get('/api/getPostAll', {params: {board_id: this.$route.params.board, limit: 0}})
            .then(res => {
            console.log(res.data);
            this.getChartState = 1;
            for(let i = 0; i < res.data.length; i++){
                if(this.$route.params.id === res.data[i].nickname 
                && this.$route.params.board == res.data[i].board_id 
                && this.$route.params.post == res.data[i].post_id){
                    this.getPostDetailData = res.data[i];
                    $('#preview-click').html(decode(this.getPostDetailData.comment));
                }
            }
        })
        .catch(err => console.log(err));
        function decode(text) {
            console.log(text);
            // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
            return $("<textarea/>").html(text).text();
        }
        await axios.get('/api/showComments', {params: {post_id: this.$route.params.post}})
        .then(res => {
            this.getCommentData = res.data;
            // 내가 올린 게시물만 수정 가능하도록 해주기.
            for (let i = 0; i < res.data.length; i++){
                res.data[i].nickname === userInformation.nickname
                    ? this.commentsEditState.push(1)
                    : this.commentsEditState.push(0);
            }
        }).catch(err => {console.log(err)});
    },
    methods: {
        // 좋아요 버튼 누르면 사이트 전체 재로딩 되지 않고, 해당 Like 컴포넌트만 재로딩 되도록 해주기.
        likeStateFunc(){
            this.likeState === 0 ? this.likeState = 1 : this.likeState = 0;
        },
        commentUpdate(){
            // 닉네임
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            axios.post('/api/comments', {
                post_id: this.$route.params.post,
                nickname: userInformation.nickname,
                content: this.commentInput,
                parent_comments_id: 0,
            })
            .then(() => {
                location.reload();
            })
            .catch(err => console.log(err));
        },
        setPost(){
            location.replace(`/edit/1/${this.$route.params.id}/${this.$route.params.post}/${this.$route.params.board}`);
        },
        deletePost(){
            if(confirm('정말 게시글을 삭제하시겠습니까?')){
                alert('삭제되었습니다!');
                console.log(this.$route.params.post);
                axios.delete('/api/deletePost', {params: {post_id: this.$route.params.post}})
                .catch(err => console.log(err));
                this.$router.go(-1);
            }
        },
        commentEdit(i){
            this.setCommentState = 1;
            this.commentState = 0;
            let inputSetCommentBox = document.querySelectorAll('.inputSetCommentBox');
            let inputSetComment = document.querySelectorAll('.inputSetComment');
            inputSetCommentBox[i].classList.add('event');
            axios.get('/api/showComments', {params: {post_id: this.$route.params.post}})
            .then(res => {
                inputSetComment[i].innerHTML = res.data[i].content;
            })
            .catch(err => console.log(err));
            
            console.log(inputSetComment[i]);
        },
        setCommentComplete(i){
            let post_id = this.$route.params.post;
            let inputSetComment = document.querySelectorAll('.inputSetComment');
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            alert(inputSetComment[i].value);
            axios.patch('/api/updateComment', {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                content: inputSetComment[i].value,
                nickname: userInformation.nickname,
                post_id: Number(post_id),
                comments_id: this.getCommentData[i].Comments_id
            }).then(res => {
                console.log(res);
                location.reload();
            }).catch(err => console.log(err));
        },
        commentBack(){
            let inputSetCommentBox = document.querySelectorAll('.inputSetCommentBox');
            for(let i = 0; i < inputSetCommentBox.length; i++){
                inputSetCommentBox[i].classList.remove('event');
            }
        },
        commentDelete(i){
            let post_id = this.$route.params.post;
            console.log(post_id);
            if(confirm('댓글을 지우시겠습니까?')){
                axios.delete('/api/deleteComment', {params: {
                    comments_id: this.getCommentData[i].Comments_id,
                    post_id: Number(post_id),
                }}).then(res => console.log(res))
                .catch(err => console.log(err));
                alert('삭제되었습니다.');
                location.reload();
            }
        },
        fn_sendFB(sns){
            let thisUrl = document.URL;
            let snsTitle = '!!!';
            if( sns == 'facebook' ) {
                var url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(thisUrl);
                window.open(url, "", "width=486, height=286");
            }
            else if( sns == 'twitter' ) {
                var url2 = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(snsTitle);
                window.open(url2, "tweetPop", "width=486, height=286,scrollbars=yes");
            }
            else if( sns == 'band' ) {
                var url3 = "http://www.band.us/plugin/share?body="+encodeURIComponent(snsTitle)+"&route="+encodeURIComponent(thisUrl);
                window.open(url3, "shareBand", "width=400, height=500, resizable=yes");
            } 
        }
    }
}
</script>

<style lang="scss" scoped>
.contain{
    .detail{
        position: relative;
        margin-top: 3%;
        .postHeader{
            width: 100%;
            height: 250px;
            
            .postImg{
                position: absolute;
                width: 100%;
                height: 100%;
                filter: brightness(0.5);
                background: rgba(0, 0, 0, .7);
                background-repeat: no-repeat;
                background-size: cover;
            }
            .user{
                position: absolute;
                width: 70%;
                margin: auto;
                left: 0;
                right: 0;
                color: #333;
                .title{
                    color: rgb(239, 239, 239);
                    font-size: 50px;
                    font-weight: 700;
                }
                .information{
                    color: rgb(214, 214, 214);
                    display: flex;
                    .id{
                        margin-right: 20px;
                    }
                }
                .setPost{
                    display: flex;
                    p{
                        color: rgb(216, 216, 216);
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    p:hover{
                        color: #fff;
                    }
                }
            }   
        }
    }
    .inner{
        width: 70vw;
        margin: auto;
        .shares{
            margin-top: -30px;
            margin-left: 15%;
            .close{
                color: #333;
                margin-right: 85%;
            }
            .share{
                width: 95px;
                font-size: 18px;
                font-weight: 600;
                border-radius: 20px;
                padding: 5px;
                cursor: pointer;
                color: #93B5C6;
            }
            .share:hover{
                background-color: rgb(237, 237, 237);
            }
        }
        .likeAndShareBtn{
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
        .likeAndShareBtn:active{
            background-color: rgb(226, 226, 226);
            color: #93B5C6;
        }
        #preview-click{
            margin-top: 20px;
            font-size: 16px;
        }
        .chart{
            position: relative;
            z-index: 100;
        }
        .commentList{
            margin-top: 50px;
            padding: 20px;
            border-radius: 10px;
            width: 70vw;
            min-height: 80px;
            background-color: rgb(243, 243, 243);
            .comments{
                .commentUserId{
                    font-weight: 900;
                }
                .commentTitle{
                    font-weight: 500;
                }
                .inputSetCommentBox{
                    display: none;
                    .inputSetComment{
                        // position: absolute;
                        resize: none;
                        border-radius: 10px;
                        border: .5px solid #333;
                        width: 100%;
                        height: 70px;
                        padding: 10px;
                    }
                    .setBtn{
                        background-color: transparent;
                        font-weight: 500;
                        // text-align: left;
                        border: 0px;
                        
                    }
                }
                .inputSetCommentBox.event{
                    display: block;
                }
                .commentSetBox{
                    position: absolute;
                    right: 17%;
                    display: flex;
                    p{
                        color: #93B5C6;
                        font-size: 13px;
                        margin-left: 10px;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }
            }
            .commentUserId{
                font-size: 14px;
            }
            .commentTitle{
                font-size: 16px;
                font-weight: 500;
            }
            .line{
                margin-top: 10px;
                margin-bottom: 10px;
                width: 100%;
                height: 0.5px;
                background-color: #333;
            }
        }
        .comment{
            width: 70vw;
            height: 30px;
            // display: flex;
            justify-content:space-between;
            margin-bottom: 120px;
            padding-bottom: 5%;
            .commentLabel{
                font-size: 14px;
            }
            .commentBox{
                #commentInput{
                    width: 100%;
                    height: 50px;
                    padding: 10px;
                    font-size: 14px;
                    resize: none;
                }
            }
            .btn{
                position: absolute;
                right: 15%;
                width: 50px;
                background-color: rgb(230, 230, 230);
                font-weight: 600;
                border-radius: 5px;
                font-size: 14px;
            }
            .btn:hover{
                background-color: #93B5C6;
                color: #fff;
            }
        }
    }
    @media screen and (max-width: 700px){
        .inner{
            .likeAndShareBtn{
                font-size: 18px;
                width: 35px;
                height: 35px;
            }
        }
        .detail{
            .postHeader{
                .user{
                    .title{
                        font-size: 40px;
                    }
                    .information, .setPost{
                        font-size: 12px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 400px){
        .detail{
            .postHeader{
                .user{
                    .title{
                        font-size: 30px;
                    }
                    .information, .setPost{
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>


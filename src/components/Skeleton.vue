<template>
    <div class="skeleton_contain">
        <div class="skeleton_img"/>
        <div class="skeleton_bottom">
            <div class="longLine"/>
            <div class="middleLine"/>
            <div class="shortLine"/>
        </div>
    </div>    
</template>

<style lang="scss" scoped>

@mixin line{
    height: 20px;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: lightgrey;
}
@mixin move_line{
    animation: slide_in 1s infinite;
    background-repeat: repeat-y;
    background-image:
    linear-gradient( 90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 100%, rgba(255, 255, 255, 0) 70% ); /* highlight */
  
    background-size: 30px 100px;
    animation: shine 1s infinite;

}

.skeleton_contain{
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 10px;
    background-color: rgb(237, 237, 237);
    .skeleton_img{
        width: 300px;
        height: 150px;
        border-radius: 5px;
        background-color: lightgrey;
        @include move_line;
    }
    .skeleton_bottom{
        .longLine{
            width: 80%;
            @include line;
            @include move_line;
        }
        .middleLine{
            width: 70%;
            @include line;
            @include move_line;
        }
        .shortLine{
            width: 50%;
            @include line;
            @include move_line;
        }
    }
}
@media screen and (max-width: 768px){
    .skeleton_contain{
        width: 100%;
        .skeleton_img, .longLine, .middleLine, .shortLine{
            width: 100%;
        }
    }
}

@keyframes shine{
    to {
        background-position:
            120% 0px;
    }
}
</style>
<template id='xcc_article'>
    <div class="article_wrap">
        <div class="article_child" v-for='(item,index) in testArticle' :key='index'>
            <div class="article_header">
                <div class="article_header_avatar">
                    <img src="../../static/images/default.jpg" alt="">
                </div>
                <div class="article_header_name">树影下的月光</div>
                <div class="article_header_time">发布于: 2019年8月28日 10:50:55</div>
            </div>
            <div class="article_center">
                <div class="article_center_title">我是文章大标题哈哈哈哈哈</div>
                <div class="article_center_main">
                    我是内容
                    <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>		    
                    <p>我也是内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>		
                    <p>我更是内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>		
                    <p>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>		    
                    <p>我也是内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>		
                    <p>我更是内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>
                </div>
                <div class="article_center_footer">
                    <div class="article_center_more">查看详情<span>››</span></div>

                    <div class="article_center_icon">
                        <Icon type="ios-thumbs-up-outline" size='16' class="article_center_icons"/>
                        <!-- <Icon type="ios-thumbs-up" size='16' class="article_center_icons"/> -->
                        <span>点赞</span>
                    </div>
                    <div class="article_center_icon">
                        <Icon type="ios-star-outline" size='16' class="article_center_icons"/>
                        <!-- <Icon type="ios-star" size='16' class="article_center_icons"/> -->
                        <span>收藏</span>
                    </div>
                    <div class="article_center_icon">
                        <Icon type="ios-chatboxes-outline" size='16' class="article_center_icons"/>
                        <span>评论</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'xcc_article',
    data() {
        return {
            testArticle: [
                {

                },
                {

                },
                {

                }
            ]
        }
    },
    methods: {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {
        
    }

}
</script>

<style lang="scss" scoped>
    .article_wrap {
        width: 100%;
        height: auto;
        padding: 20px 0;
        
        .article_child {
            width: 88%;
            height: auto;
            margin: 0px auto 40px auto;
            padding: 15px 10px 0 10px;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 1);

            .article_header {
                width: 100%;
                height: 50px;
                position: relative;
                color: black;

                .article_header_avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .article_header_name {
                    width: 500px;
                    height: 25px;
                    line-height: 25px;
                    position: absolute;
                    left: 50px;
                    top: 0;
                }

                .article_header_time {
                    width: 500px;
                    height: 15px;
                    line-height: 15px;
                    font-size: 12px;
                    position: absolute;
                    left: 50px;
                    bottom: 10px;
                    color: rgb(88, 88, 88);
                }
            }

            .article_center {
                width: 100%;
                height: auto;
                box-sizing: border-box;
                padding: 0 10px 6px 10px;

                .article_center_title {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    color: black;
                    // text-align: center;
                }

                .article_center_main {
                    margin-top: 5px;

                    p {
                        margin: 6px 0;
                    }
                }

                .article_center_footer {

                    width: 100%;
                    height: 35px;
                    line-height: 45px;
                    margin: 20px 0 5px 0;
                    font-size: 15px;
                    position: relative;

                    &::after {
                        position: absolute;
                        content: '';
                        left: -20px;
                        right: -20px;
                        top: 0;
                        height: 1px;
                        background-color: rgba(240, 240, 240, 1);
                    }
                    

                    .article_center_icon {
                        width: 60px;
                        margin-right: 50px;
                        display: inline-block;
                        cursor: pointer;
                    }

                    .article_center_icons {
                        position: relative;
                        top: -2px;
                        font-weight: bold;
                        margin-right: 2px;
                    }

                    .article_center_more {
                        position: absolute;
                        width: 60px;
                        height: 30px;
                        line-height: 30px;
                        right: 0px;
                        font-size: 12px;
                        bottom: -3px;
                        text-align: center;
                        background-color: rgb(58, 63, 81);    
                        color: white;
                        border-radius: 4px;
                        padding-right: 15px;
                        box-sizing: unset;
                        cursor: pointer;
                        transition: all .2s ease;

                        &:hover {
                            background-color: #32374a;
                        }

                        span {
                            font-size: 18px;
                            position: absolute;
                            right: 5px;
                            top: -1px;
                        }
                    }
                }
            }
        }
    }
</style>
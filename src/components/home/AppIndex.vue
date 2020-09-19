<template>
    <div class="ap">
        <a-carousel autoplay>
            <div id="ymd"><h3>欢迎来到图书管理系统</h3></div>
            <div><h3>好书推荐</h3></div>
            <div><h3>每日一问</h3></div>
            <div><h3>会员充值（爬）</h3></div>
        </a-carousel>
    </div>
</template>
<script>
export default {
    name:  'AppIndex',
    methods: {

    }
};
</script>
<style scoped>
/* For demo */
.ap {
    margin: auto;
    width: 800px;
}

.ant-carousel >>> .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #7c64ff;
    overflow: hidden;
}

.ant-carousel >>> .ap .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
}
.ant-carousel >>> .ap .custom-slick-arrow:before {
    display: none;
}
.ant-carousel >>> .ap .custom-slick-arrow:hover {
    opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
    color: #fff;
}
</style>

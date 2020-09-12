<template>
    <div>
        <el-row style="height: 840px;">
            <!--<search-bar></search-bar>-->
            <el-popover placement="right" trigger="hover" width="250"
                        v-for="item in books"
                        v-bind:key="item.id">
<!--                <div slot="content" >{{item.title}}<br/>{{item.author}}/{{item.date}}/-->
<!--                    {{item.press}}<br/>{{item.abs}}</div>-->
<!--                <div slot="content" >-->
<!--                    <span>{{item.author}}</span> /-->
<!--                    <span>{{item.date}}</span> /-->
<!--                    <span>{{item.press}}</span>-->
<!--                </div>-->
<!--                <div slot="content" >{{item.abs}}</div>-->
                <div>{{item.title}}<br/><br/>{{item.author}} / {{item.date}} /
                    {{item.press}}<br/><br/>{{item.abs}}</div>

                <el-card slot="reference" style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                         body-style="padding:10px" shadow="hover">
                    <div class="cover">
                        <img :src="item.cover" alt="封面">
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.title}}</a>
                        </div>
                    </div>
                    <div class="author">{{item.author}}</div>
                </el-card>
            </el-popover>
        </el-row>
        <el-row>
            <el-pagination
                :current-page="1"
                :page-size="10"
                :total="20">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Books',
    data () {
        return {
            books: [
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体0',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体1',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体2',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体3',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体4',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体5',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体6',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体7',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                },
                {
                    cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                    title: '三体8',
                    author: '刘慈欣',
                    date: '2019-05-05',
                    press: '重庆出版社',
                    abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                }
            ]
        }
    }
}
</script>

<style scoped>
.cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
}

img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
}

.title {
    font-size: 14px;
    text-align: left;
}

.author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
}

.abstract {
    display: block;
    line-height: 17px;
}

a {
    text-decoration: none;
}

a:link, a:visited, a:focus {
    color: #3377aa;
}
</style>


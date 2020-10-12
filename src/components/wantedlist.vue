<template>
    <el-container>
        <el-aside style="width: 200px;margin-top: 20px">

        </el-aside>
        <el-main>
            <div class="wantedlistarea">
                <el-row style="height: 840px;">
                    <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
                    <el-popover placement="right" trigger="hover" width="60"
                                v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                v-bind:key="item.id">
                        <div>点击查看详情</div>

                        <el-card slot="reference"
                                 style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"
                                 class="book"
                                 body-style="padding:10px" shadow="hover">
                            <div class="cover">
                                <a slot="actions" :href="'/showinwantedlist?id='+item.id">
                                    <img :src="item.cover" alt="封面">
                                </a>
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a href="">{{ item.bookname }}</a>
                                </div>
                                <i class="el-icon-delete" @click="deleteWantedList(item.id)"></i>
                            </div>
                            <div class="author">{{ item.author }}</div>
                        </el-card>
                    </el-popover>
                </el-row>
                <el-row>
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size.sync="pagesize"
                        :page-sizes="[18]"
                        :total="books.length">
                    </el-pagination>
                </el-row>
            </div>
        </el-main>
    </el-container>

</template>

<script>
import Books from './library/Books'
import EditForm from './library/EditForm'
import SearchBar from './library/SearchBar'
import {MessageBox} from 'element-ui'
import {Message} from 'element-ui'

export default {
    name: "wantedlist",
    components: {Books, EditForm, SearchBar},
    data() {
        return {
            users: [],
            books: [],
            currentPage: 1,
            pagesize: 18
        }
    },
    mounted: function () {
        this.loadWantedList()
    },
    methods: {
        listByCategory() {
            let _this = this;
            let cid = this.$refs.sideMenu.cid;
            let url = 'categories/' + 0 + '/books';
            this.$axios.get(url).then(resp => {
                if (resp && resp.status === 200) {
                    _this.$refs.booksArea.books = resp.data.data
                    _this.$refs.booksArea.currentPage = 1
                }
            })
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage
        },
        searchResult() {
            let _this = this;
            this.$axios
                .get('/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
                if (resp && resp.status === 200) {
                    _this.books = resp.data.data
                }
            })
        },
        // loadBooks () {
        //     let _this = this;
        //     this.$axios.get('/books').then(resp => {
        //         if (resp && resp.status === 200) {
        //             _this.books = resp.data.data
        //             _this.currentPage = 1
        //         }
        //     })
        // },
        deleteWantedList(id) {
            let _this = this;
            MessageBox.confirm('是否将此书移出收藏夹?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    this.$axios
                        .post('/wantedlist/books/delete', {
                            bid: id,
                            username: JSON.parse(window.localStorage.getItem('username' || '[]'))
                        }).then(resp => {
                        if (resp && resp.status === 200) {
                            _this.loadWantedList()
                            Message.success("删除成功")
                        }
                    })
                }
            ).catch(() => {
                Message.info("已取消删除")
            })
        },
        loadWantedList() {
            let _this = this;
            this.$axios.post('/wantedlist', {
                username: JSON.parse(window.localStorage.getItem('username' || '[]'))
            }).then(resp => {
                if (resp && resp.status === 200) {
                    _this.books = resp.data.data
                    _this.currentPage = 1
                }
            })
        },
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

.wantedlistarea {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
}

.el-icon-delete {
    cursor: pointer;
    float: right;
}
</style>

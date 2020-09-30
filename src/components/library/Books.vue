<template>
    <div>
        <el-row style="height: 840px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-popover placement="right" trigger="hover" width="250"
                        v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        v-bind:key="item.id">
                <div>{{ item.bookname }}<br/><br/>{{ item.author }} / {{ item.date }} /
                    {{ item.press }}<br/><br/>{{ item.abs }}
                </div>

                <el-card slot="reference"
                         style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"
                         class="book"
                         body-style="padding:10px" shadow="hover">
                    <!--                    <div class="cover" @click="editBook(item)">-->
                    <div class="cover">
                        <a slot="actions" :href="'/show?id='+item.id">
                            <img :src="item.cover" alt="封面">
                        </a>
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{ item.bookname }}</a>
                        </div>
                        <!--                        <i class="el-icon-star-off" @click="deleteBook(item.id)"></i>-->
                        <i class="el-icon-plus" @click="wantedlist(item.id)"></i>
                    </div>
                    <div class="author">{{ item.author }}</div>
                </el-card>
            </el-popover>
            <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
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
</template>

<script>
import EditForm from './EditForm'
import SearchBar from './SearchBar'
import {MessageBox} from 'element-ui'
import {Message} from 'element-ui'

export default {
    name: 'Books',
    components: {EditForm, SearchBar},
    data() {
        return {
            users: [],
            books: [],
            currentPage: 1,
            pagesize: 18,
            isLiked: 0,
            url: 4
        }
    },
    mounted: function () {
        this.loadBooks()
        this.listUsers()
    },
    methods: {
        listUsers() {
            let _this = this
            this.$axios.get('/admin/user').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.users = resp.data.data
                }
            })
        },
        loadBooks() {
            let _this = this;
            this.$axios.get('/books').then(resp => {
                if (resp && resp.status === 200) {
                    _this.books = resp.data.data
                    _this.currentPage = 1
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
        wantedlist(id) {
            MessageBox.confirm('确定要添加到收藏夹中吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/addwantedlist', {
                    bid: id,
                    username: JSON.parse(window.localStorage.getItem('username' || '[]'))
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        console.log("wantedlist " + id + " " + JSON.parse(window.localStorage.getItem('username' || '[]')))
                        Message.success("添加成功")
                    }
                })
                this.isLiked = 1
            }).catch(() => {
                Message.info("已取消操作")
            })
        },
        deleteBook(id) {
            let _this = this;
            MessageBox.confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    this.$axios
                        .post('admin/content/books/delete', {id: id}).then(resp => {
                        if (resp && resp.status === 200) {
                            _this.loadBooks()
                            Message.success("删除成功")
                        }
                    })
                }
            ).catch(() => {
                Message.info("已取消删除")
            })
        },
        editBook(item) {
            this.$refs.edit.dialogFormVisible = true
            this.$refs.edit.form = {
                id: item.id,
                cover: item.cover,
                bookname: item.bookname,
                author: item.author,
                date: item.date,
                press: item.press,
                abs: item.abs,
                category: {
                    id: item.category.id.toString(),
                    name: item.category.name
                }
            }
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

.el-icon-plus {
    cursor: pointer;
    float: right;
}

a {
    text-decoration: none;
}

a:link, a:visited, a:focus {
    color: #3377aa;
}
</style>


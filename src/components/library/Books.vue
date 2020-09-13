<template>
    <div>
        <el-row style="height: 840px;">
            <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
            <el-popover placement="right" trigger="hover" width="250"
                        v-for="item in books"
                        v-bind:key="item.id">
                <div>{{item.title}}<br/><br/>{{item.author}} / {{item.date}} /
                    {{item.press}}<br/><br/>{{item.abs}}</div>

                <el-card slot="reference" style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                         body-style="padding:10px" shadow="hover">
                    <div class="cover" @click="editBook(item)">
                        <img :src="item.cover" alt="封面">
                    </div>
                    <div class="info">
                        <div class="title">
                            <a href="">{{item.title}}</a>
                        </div>
                        <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
                    </div>
                    <div class="author">{{item.author}}</div>
                </el-card>
            </el-popover>
            <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
        </el-row>
        <el-row>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="books.currentPage"
                :page-size="books.pagesize"
                :total="books.length">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
import EditForm from './EditForm'
import SearchBar from './SearchBar'
export default {
    name: 'Books',
    components: {EditForm, SearchBar},
    data () {
        return {
            books: [],
        }
    },
    mounted: function () {
        this.loadBooks()
    },
    methods: {
        loadBooks () {
            let _this = this;
            this.$axios.get('/books').then(resp => {
                if (resp && resp.status === 200) {
                    _this.books = resp.data
                    _this.currentPage = 1
                }
            })
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage
            console.log(this.currentPage)
        },
        searchResult () {
            let _this = this;
            this.$axios
                .get('/search?keywords=' + this.$refs.searchBar.keywords, {
                }).then(resp => {
                if (resp && resp.status === 200) {
                    _this.books = resp.data
                }
            })
        },
        deleteBook (id) {
            this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    this.$axios
                        .post('/delete', {id: id}).then(resp => {
                        if (resp && resp.status === 200) {
                            this.loadBooks()
                        }
                    })
                }
            ).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
            // alert(id)
        },
        editBook (item) {
            this.$refs.edit.dialogFormVisible = true
            this.$refs.edit.form = {
                id: item.id,
                cover: item.cover,
                title: item.title,
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

.el-icon-delete {
    cursor: pointer;
    float: right;
}

.switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
}

a {
    text-decoration: none;
}

a:link, a:visited, a:focus {
    color: #3377aa;
}
</style>


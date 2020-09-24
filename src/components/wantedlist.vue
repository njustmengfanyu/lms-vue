<template>
    <el-container>
<!--        <el-aside style="width: 200px;margin-top: 20px">-->
<!--            <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>-->
<!--        </el-aside>-->
        <el-main>
            <Books class="books-area" ref="booksArea"></Books>
        </el-main>
    </el-container>
</template>

<script>
import Books from './library/Books'
export default {
    name: "wantedlist",
    components: {Books},
    methods: {
        listByCategory () {
            let _this = this;
            let cid = this.$refs.sideMenu.cid;
            let url = 'categories/' + 0 + '/books';
            this.$axios.get(url).then(resp => {
                if (resp && resp.status === 200) {
                    _this.$refs.booksArea.books = resp.data.data
                    _this.$refs.booksArea.currentPage = 1
                }
            })
        }
    }
}
</script>

<style scoped>
.books-area {
    padding-left: 50px;
    width: 990px;
    margin-left: auto;
    margin-right: auto;
}
</style>

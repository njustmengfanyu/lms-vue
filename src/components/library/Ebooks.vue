<template>
    <div class="ebook">
        <div class="read-wrapper">
            <div id="read"></div>
        </div>
    </div>
</template>

<script>

import Epub from 'epubjs'

const DOWNLOAD_URL = '/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
export default {
    name: 'Ebooks',
    methods: {
        //电子书的解析和渲染
        showEpub() {
            //生成Ebook
            this.book = new Epub(DOWNLOAD_URL)
            console.log(this.book)
            //生成Rendition,通过Book.renderTo
            //挂在在id为read的下面
            this.rendition = this.book.renderTo('read', {
                width: window.innerWidth,
                height: window.innerHeight
            })
            //通过Rendition.display渲染电子书
            this.rendition.display()
            this.themes = this.rendition.themes
            this.setFontSize(this.defaultFontSize)
        },
        prevPage() {
            if (this.rendition) {
                this.rendition.prev()
            }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next()
            }
        },
        setFontSize(fontSize) {
            this.defaultFontSize = fontSize
            // 在父类操作fontSize(调用父组件的setFontSize方法)
            this.$emit('setFontSize', fontSize)
        },
    },
    mounted() {
        this.showEpub()
    }
}
</script>

<style scoped>

</style>

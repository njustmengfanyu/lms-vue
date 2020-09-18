<template>
    <el-upload
        class="img-upload"
        ref="upload"
        action="http://localhost:8998/api/admin/content/books/covers"
        with-credentials
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-change="changeUpload"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/img文件，且文件大小不超过500kb</div>
    </el-upload>
</template>

<script>

export default {
    name: 'ImgUpload',
    data() {
        return {
            fileList: [],
            url: ''
        }
    },
    methods: {
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
        },
        handleSuccess(response) {
            this.url = response
            this.$emit('onUpload')
            //this.$message.warning('上传成功')
            this.$message.success('上传成功')
        },
        changeUpload(file, fileList) {
            const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
            const extension1 = fileType === 'img'
            const extension2 = fileType === 'jpg'
            const extension3 = fileType === 'jpeg'
            const extension4 = fileType === 'png'
            if (!extension1 && !extension2 && !extension3 && !extension4) {
                this.$msgbox.alert('上传文件只能是jpeg,jpg,img,png格式!')
                //获取上传的文件
                let fileArr = this.$refs.upload.uploadFiles;
                fileArr.forEach((item, index) => {//这里是防止编辑的时候，删除已经存在的文件（我用多余的属性 id，kind来区分是新上传的文件，还是编辑的时候已经存在的文件）
                    if (!item.id && !item.kind) {
                        fileArr.splice(index, 1)//如果格式不对的文件，直接强制移除
                    }
                })
            }
        },
        clearFiles() {
            this.$refs.upload.clearFiles()
        },
        clear() {
            this.$refs.upload.clearFiles()
        }
    }
}
</script>

<style scoped>

</style>

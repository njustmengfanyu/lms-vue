<!--<template>-->
<!--  <div>-->
<!--    <el-row style="margin: 18px 0 0 18px ">-->
<!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>内容管理</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>图书管理</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </el-row>-->
<!--    <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>-->
<!--    <el-card style="margin: 18px 2%;width: 95%">-->
<!--      <el-table-->
<!--        :data="books"-->
<!--        stripe-->
<!--        style="width: 100%"-->
<!--        :max-height="tableHeight">-->
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <el-form label-position="left" inline>-->
<!--              <el-form-item>-->
<!--                <span>{{ props.row.abs }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="title"-->
<!--          label="书名（展开查看摘要）"-->
<!--          fit>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="category.name"-->
<!--          label="分类"-->
<!--          width="100">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="author"-->
<!--          label="作者"-->
<!--          fit>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="date"-->
<!--          label="出版日期"-->
<!--          width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="press"-->
<!--          label="出版社"-->
<!--          fit>-->
<!--        </el-table-column>-->
<!--        &lt;!&ndash;<el-table-column&ndash;&gt;-->
<!--          &lt;!&ndash;prop="abs"&ndash;&gt;-->
<!--          &lt;!&ndash;label="摘要"&ndash;&gt;-->
<!--          &lt;!&ndash;show-overflow-tooltip&ndash;&gt;-->
<!--          &lt;!&ndash;fit>&ndash;&gt;-->
<!--        &lt;!&ndash;</el-table-column>&ndash;&gt;-->
<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="120">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              @click.native.prevent="editBook(scope.row)"-->
<!--              type="text"-->
<!--              size="small">-->
<!--              编辑-->
<!--            </el-button>-->
<!--            <el-button-->
<!--              @click.native.prevent="deleteBook(scope.row.id)"-->
<!--              type="text"-->
<!--              size="small">-->
<!--              移除-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div style="margin: 20px 0 20px 0;float: left">-->
<!--        <el-button>取消选择</el-button>-->
<!--        <el-button>批量删除</el-button>-->
<!--      </div>-->
<!--    </el-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import EditForm from '../../library/EditForm'-->
<!--  export default {-->
<!--    name: 'BookManagement',-->
<!--    components: {EditForm},-->
<!--    data () {-->
<!--      return {-->
<!--        books: []-->
<!--      }-->
<!--    },-->
<!--    mounted () {-->
<!--      this.loadBooks()-->
<!--    },-->
<!--    computed: {-->
<!--      tableHeight () {-->
<!--        return window.innerHeight - 320-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      deleteBook (id) {-->
<!--        this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {-->
<!--          confirmButtonText: '确定',-->
<!--          cancelButtonText: '取消',-->
<!--          type: 'warning'-->
<!--        }).then(() => {-->
<!--            this.$axios-->
<!--              .post('/admin/content/books/delete', {id: id}).then(resp => {-->
<!--              if (resp && resp.data.code === 200) {-->
<!--                this.loadBooks()-->
<!--              }-->
<!--            })-->
<!--          }-->
<!--        ).catch(() => {-->
<!--          this.$message({-->
<!--            type: 'info',-->
<!--            message: '已取消删除'-->
<!--          })-->
<!--        })-->
<!--      },-->
<!--      editBook (item) {-->
<!--        this.$refs.edit.dialogFormVisible = true-->
<!--        this.$refs.edit.form = {-->
<!--          id: item.id,-->
<!--          cover: item.cover,-->
<!--          title: item.title,-->
<!--          author: item.author,-->
<!--          date: item.date,-->
<!--          press: item.press,-->
<!--          abs: item.abs,-->
<!--          category: {-->
<!--            id: item.category.id.toString(),-->
<!--            name: item.category.name-->
<!--          }-->
<!--        }-->
<!--        // this.$refs.edit.category = {-->
<!--        //   id: item.category.id.toString()-->
<!--        // }-->
<!--      },-->
<!--      loadBooks () {-->
<!--        var _this = this-->
<!--        this.$axios.get('/books').then(resp => {-->
<!--          if (resp && resp.data.code === 200) {-->
<!--            _this.books = resp.data.result-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
<template>
    <div>
        <div style="margin-bottom: 16px">
            <!--    <div style="font-size: 24px; height: 30px; margin-bottom: 15px">-->
            <!--        <a-space>用户管理 > 用户信息</a-space>-->
            <!--    </div>-->
            <el-row style="margin: 18px 0 0 18px ">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                    <el-breadcrumb-item>图书管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
            <a-button class="editable-add-btn" @click="handleAdd">
                添加图书信息
            </a-button>
            <span style="margin-right: 24px"></span>
            <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
                重置页面
            </a-button>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                    {{ `Selected ${selectedRowKeys.length} items` }}
                </template>
            </span>
        </div>
        <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="data"
            rowKey='id'
            bordered
        >
            <div
                slot="filterDropdown"
                slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                style="padding: 8px"
            >
                <a-input
                    v-ant-ref="c => (searchInput = c)"
                    :placeholder="`搜索 ${column.dataIndex}`"
                    :value="selectedKeys[0]"
                    style="width: 188px; margin-bottom: 8px; display: block;"
                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                    type="primary"
                    icon="search"
                    size="small"
                    style="width: 90px; margin-right: 8px"
                    @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                    搜索
                </a-button>
                <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                    重置
                </a-button>
            </div>
            <a-icon
                slot="filterIcon"
                slot-scope="filtered"
                type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <template slot="customRender" slot-scope="text, record, index, column">
            <span v-if="searchText && searchedColumn === column.dataIndex">
                <template
                    v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                <mark
                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                >{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
                </template>
                </span>
                <template v-else>{{ text }}</template>
            </template>
            <template slot="operation_delete" slot-scope="text, record">
                <a-popconfirm
                    v-if="data.length"
                    title="确定要删除吗?"
                    @confirm="() => onDelete(record.key)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
            <template
                v-for="col in ['id', 'username', 'name', 'phone', 'email', 'enabled']"
                :slot="col"
                slot-scope="text, record, index"
            >
                <div :key="col">
                    <a-input
                        v-if="record.editable"
                        style="margin: -5px 0"
                        :value="text"
                        @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template slot="operation_edit" slot-scope="text, record, index">
                <div class="editable-row-operations">
                    <span v-if="record.editable">
                        <a @click="() => save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
                     </span>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>

const data = [];
// for (let i = 0; i < 6; i++) {
//     data.push({
//         key: i.toString(),
//         id: `Edward King ${i}`,
//         username: 32,
//         name: `abc. ${i}`,
//         phone: 111,
//         email: '111@qq.com',
//         status: 1
//     });
// }

export default {
    name: 'UserProfile',
    data() {
        this.cacheData = data.map(item => ({...item}));
        return {
            data,
            searchText: '',
            searchInput: null,
            searchedColumn: '',
            editingKey: '',
            columns: [
                {
                    title: '书名',
                    dataIndex: 'id',
                    key: 'id',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'id',
                    },
                    onFilter: (value, record) =>
                        record.id
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            }, 0);
                        }
                    },
                },
                {
                    title: '分类',
                    dataIndex: 'username',
                    key: 'username',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'username',
                    },
                    onFilter: (value, record) =>
                        record.username
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    },
                },
                {
                    title: '作者',
                    dataIndex: 'name',
                    key: 'name',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'name',
                    },
                    onFilter: (value, record) =>
                        record.name
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    },
                },
                {
                    title: '出版日期',
                    dataIndex: 'phone',
                    key: 'phone',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'phone',
                    },
                    onFilter: (value, record) =>
                        record.phone
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    },
                },
                {
                    title: '出版社',
                    dataIndex: 'email',
                    key: 'email',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'email',
                    },
                    onFilter: (value, record) =>
                        record.email
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: visible => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            });
                        }
                    },
                },
                {
                    title: '删除',
                    dataIndex: 'operation_delete',
                    scopedSlots: {customRender: 'operation_delete'},
                },
                {
                    title: '修改',
                    dataIndex: 'operation_edit',
                    scopedSlots: {customRender: 'operation_edit'},
                },
            ],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        };
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    mounted() {
        //this.listUsers()
        this.listRoles()
        this.listUsers()
    },
    methods: {
        // listUsers() {
        //     let _this = this
        //     this.$axios.get('/admin/user').then(resp => {
        //         if (resp && resp.data.code === 200) {
        //             _this.user = resp.data.result
        //         }
        //     })
        // },
        // listRoles() {
        //     let _this = this
        //     this.$axios.get('/admin/role').then(resp => {
        //         if (resp && resp.data.code === 200) {
        //             _this.roles = resp.data.result
        //         }
        //     })
        // },
        listUsers() {
            let _this = this
            this.$axios.get('/admin/user').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.data = resp.data.data
                }
            })
        },
        listRoles() {
            let _this = this
            this.$axios.get('/admin/role').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.roles = resp.data.data
                }
            })
        },
        // commitStatusChange(value, user) {
        //     if (user.username !== 'admin') {
        //         this.$axios.put('/admin/user/status', {
        //             enabled: value,
        //             username: user.username
        //         }).then(resp => {
        //             if (resp && resp.data.code === 200) {
        //                 if (value) {
        //                     this.$message('用户 [' + user.username + '] 已启用')
        //                 } else {
        //                     this.$message('用户 [' + user.username + '] 已禁用')
        //                 }
        //             }
        //         })
        //     } else {
        //         user.enabled = true
        //         this.$alert('不能禁用管理员账户')
        //     }
        // },
        // onSubmit(user) {
        //     let _this = this
        //     // 根据视图绑定的角色 id 向后端传送角色信息
        //     let roles = []
        //     for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        //         for (let j = 0; j < _this.roles.length; j++) {
        //             if (_this.selectedRolesIds[i] === _this.roles[j].id) {
        //                 roles.push(_this.roles[j])
        //             }
        //         }
        //     }
        //     this.$axios.put('/admin/user', {
        //         username: user.username,
        //         name: user.name,
        //         phone: user.phone,
        //         email: user.email,
        //         roles: roles
        //     }).then(resp => {
        //         if (resp && resp.data.code === 200) {
        //             this.$alert('用户信息修改成功')
        //             this.dialogFormVisible = false
        //             // 修改角色后重新请求用户信息，实现视图更新
        //             this.listUsers()
        //         } else {
        //             this.$alert(resp.data.message)
        //         }
        //     })
        // },
        // editUser(user) {
        //     this.dialogFormVisible = true
        //     this.selectedUser = user
        //     let roleIds = []
        //     for (let i = 0; i < user.roles.length; i++) {
        //         roleIds.push(user.roles[i].id)
        //     }
        //     this.selectedRolesIds = roleIds
        // },
        // resetPassword(username) {
        //     this.$axios.put('/admin/user/password', {
        //         username: username
        //     }).then(resp => {
        //         if (resp && resp.data.code === 200) {
        //             this.$alert('密码已重置为 123')
        //         }
        //     })
        // },

        //demo
        start() {
            this.loading = true;
            // ajax request after empty completing
            setTimeout(() => {
                this.loading = false;
                this.selectedRowKeys = [];
            }, 500);
        },
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        onDelete(key) {
            const data = [...this.data];
            this.data = data.filter(item => item.key !== key);
        },
        handleSearch(selectedKeys, confirm, dataIndex) {
            confirm();
            this.searchText = selectedKeys[0];
            this.searchedColumn = dataIndex;
        },

        handleReset(clearFilters) {
            clearFilters();
            this.searchText = '';
        },
        handleAdd() {
            const {count, data} = this;
            const newData = {
                key: count,
                id: `Edward King ${count}`,
                username: 32,
                name: `London, Park Lane no. ${count}`,
            };
            this.data = [...data, newData];
            this.count = count + 1;
        },
        handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
                target[column] = value;
                this.data = newData;
            }
        },
        edit(key) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.data = newData;
            }
        },
        save(key) {
            const newData = [...this.data];
            const newCacheData = [...this.cacheData];
            const target = newData.filter(item => key === item.key)[0];
            const targetCache = newCacheData.filter(item => key === item.key)[0];
            if (target && targetCache) {
                delete target.editable;
                this.data = newData;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
            }
            this.editingKey = '';
        },
        cancel(key) {

            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                delete target.editable;
                this.data = newData;
            }
        },
    },
};
</script>

<style scoped>
.highlight {
    background-color: rgb(255, 192, 105);
    padding: 0;
}

.editable-row-operations a {
    margin-right: 8px;
}
</style>

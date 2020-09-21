<template>
    <div>
        <div style="margin-bottom: 16px">
            <el-row style="margin: 18px 0 0 18px ">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户信息</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
            <a-button class="editable-add-btn" @click="addNode">
                添加用户信息
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
                    @confirm="() => onDelete(record.id)"
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
                        @change="e => handleChange(e.target.value, record.id, col)"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template slot="operation_edit" slot-scope="text, record, index">
                <div class="editable-row-operations">
                    <span v-if="record.editable">
                        <a @click="() => save(record.id)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
                            <a>Cancel</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
<!--                        <a :disabled="editingKey !== ''" @click="() => edit(record.id)">编辑</a>-->
                         <a :disabled="editingKey !== ''" @click="editNode(record)">编辑</a>
                    </span>
                </div>
            </template>
        </a-table>

        <el-dialog
            title="修改用户信息"
            :visible.sync="dialogFormVisible"
            @close="clear">
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="id" :label-width="formLabelWidth" prop="id">
                    <el-input v-model="form.id" autocomplete="off" :placeholder="dialogForm_id"
                              :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off" :placeholder="dialogForm_username"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" :placeholder="dialogForm_name"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" :placeholder="dialogForm_phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="form.email" autocomplete="off" :placeholder="dialogForm_email"></el-input>
                </el-form-item>
                <!--                <el-form-item label="状态" :label-width="formLabelWidth" prop="enabled">-->
                <!--                    <el-input v-model="form.enabled" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="添加用户"
            :visible.sync="dialogFormVisible_add"
            @close="clear_add"
            width="25%">
            <el-form :model="loginForm" :rules="rules" label-position="left"
                     label-width="0px">
                <el-form-item prop="username">
                    <el-input type="text" v-model="loginForm.username"
                              auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password"
                              auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="loginForm.name"
                              auto-complete="off" placeholder="真实姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="loginForm.phone"
                              auto-complete="off" placeholder="电话号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="loginForm.email"
                              auto-complete="off" placeholder="E-Mail"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_add = false">取 消</el-button>
                <el-button type="primary" @click="register_add(loginForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>


</template>
<script>

const data = [];
const roles = [];
let obj = {};
import BulkRegistration from './BulkRegistration'
//2020.9.20 15.05 xiugaiqian

export default {

    name: 'UserProfile',
    components: {BulkRegistration},
    data() {
        this.cacheData = data.map(item => ({...item}));
        return {
            rules: {
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
            loginForm: {
                username: '',
                password: '',
                name: '',
                phone: '',
                email: ''
            },
            dialogFormVisible: false,
            dialogFormVisible_add: false,
            dialogForm_id: 0,
            dialogForm_username: '',
            dialogForm_name: '',
            dialogForm_phone: '',
            dialogForm_email: '',
            form: {
                id: '',
                username: '',
                name: '',
                phone: '',
                email: '',
                //enabled: '',
            },
            formLabelWidth: '120px',

            data,
            searchText: '',
            searchInput: null,
            searchedColumn: '',
            editingKey: '',
            //roles,
            columns: [
                {
                    title: 'id',
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
                    title: '用户名',
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
                    title: '真实姓名',
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
                    title: '手机号',
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
                    title: '邮箱',
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
                    title: '状态',
                    dataIndex: 'enabled',
                    key: 'enabled',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'enabled',
                    },
                    onFilter: (value, record) =>
                        record.enabled
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
        this.listRoles()
        this.listUsers()
    },
    methods: {
        addNode() {
            this.dialogFormVisible_add = true
        },

        clear_add() {
            this.loginForm = {
                username: '',
                password: '',
                name: '',
                phone: '',
                email: ''
            }
        },
        register_add(formName) {
            let _this = this
            this.$axios.post('/register', this.loginForm)
                .then(resp => {
                    if (resp.data.code === 200) {
                        this.$alert('注册成功', '提示', {
                            confirmButtonText: '确定',
                        })
                        this.dialogFormVisible_add = false
                        this.clear_add()
                        this.listUsers()
                        // this.$emit('onSubmit_add')
                    } else {
                        this.$alert(resp.data.message, '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                })
                .catch(failResponse => {
                })
        },


        clear() {
            this.form = {
                id: '',
                username: '',
                name: '',
                phone: '',
                email: '',
                enabled: ''
            }
        },
        onSubmit() {
            this.$axios
                .put('/admin/user', {
                    id: this.dialogForm_id,
                    username: this.form.username,
                    name: this.form.name,
                    phone: this.form.phone,
                    email: this.form.email,
                    //enabled: this.form.enabled,
                }).then(resp => {
                if (resp && resp.status === 200) {
                    console.log(resp.status)
                    this.dialogFormVisible = false
                    this.$emit('onSubmit')
                    this.$message.success(resp.data.message)
                    this.listUsers()
                } else {
                    console.log(resp.status)
                    this.$message.error('提交错误')
                }
            })
                .catch(err => {
                    this.$message.error('服务器错误')
                })
        },


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
        onDelete(id) {
            let _this = this
            const data = [...this.data];
            this.data = data.filter(item => item.id !== id);
            this.$axios.post('admin/user/delete', {id: id}).then(resp => {
                if (resp && resp.status === 200) {
                    this.listUsers()
                }
            })
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
        },
        handleChange(value, id, column) {
            const newData = [...this.data];
            const target = newData.filter(item => id === item.id)[0];
            console.log('column ' + column + ' value ' + value)
            if (target) {
                target[column] = value;
                this.data = newData;
            }
        },
        edit(id) {
            const newData = [...this.data];
            const target = newData.filter(item => id === item.id)[0];
            this.editingKey = id;
            if (target) {
                target.editable = true;
                this.data = newData;
            }
        },
        save(id) {
            let _this = this
            const newData = [...this.data];
            const newCacheData = [...this.cacheData];
            const target = newData.filter(item => id === item.id)[0];
            const targetCache = newCacheData.filter(item => id === item.id)[0];
            if (target && targetCache) {
                delete target.editable;
                this.data = newData;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
            }
            console.log("tar值 " + targetCache + " cache " + this.cacheData + " target " + target)
            this.editingKey = '';
            console.log(...this.data)
            this.$axios.put('/admin/user', {
                ...this.data
            })
                .then(resp => {
                    if (resp && resp.data.code === 200) {
                        this.$alert('用户信息修改成功')
                        // 修改角色后重新请求用户信息，实现视图更新
                        this.listUsers()
                    } else {
                        this.$alert(resp.data.message)
                    }
                })
        },
        cancel(id) {
            const newData = [...this.data];
            const target = newData.filter(item => id === item.id)[0];
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                this.data = newData;
            }
        },
        editNode: function (item) {
            console.log(item)
            this.dialogFormVisible = true
            this.dialogForm_id = item.id
            this.dialogForm_username = item.username
            this.dialogForm_name = item.name
            this.dialogForm_phone = item.phone
            this.dialogForm_email = item.email
        }
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


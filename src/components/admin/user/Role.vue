<template>
    <div>
        <el-dialog
            title="修改角色信息"
            :visible.sync="dialogFormVisible_bdd">
            <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
                <el-form-item label="角色名" label-width="120px" prop="username">
                    <el-input v-model="selectedRole.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="120px" prop="name">
                    <el-input v-model="selectedRole.nameZh" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能配置" label-width="120px" prop="perms">
                    <el-checkbox-group v-model="selectedPermsIds">
                        <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{ perm.desc_ }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="菜单配置" label-width="120px" prop="menus">
                    <el-tree
                        :data="menus"
                        :props="props"
                        show-checkbox
                        :default-checked-keys="selectedMenusIds"
                        node-key="id"
                        ref="tree">
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_bdd = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 16px">
            <el-row style="margin: 18px 0 0 18px ">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                    {{ `Selected ${selectedRowKeys.length} items` }}
                </template>
            </span>
        </div>
        <a-table
            :columns="columns"
            :data-source="roles"
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
            <template
                v-for="col in ['id', 'name', 'nameZh', 'enabled']"
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
            title="修改用户角色信息"
            :visible.sync="dialogFormVisible"
            @close="clear">
            <el-form v-model="form" style="text-align: left" ref="dataForm">
                <el-form-item label="id" :label-width="formLabelWidth" prop="id">
                    <el-input v-model="form.id" autocomplete="off" :placeholder="dialogForm_id"
                              :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" :placeholder="dialogForm_name"></el-input>
                </el-form-item>
                <el-form-item label="角色分配" label-width="120px" prop="roles">
                    <el-checkbox-group v-model="selectedRolesIds" :max="1">
                        <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{ role.nameZh }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!--                <el-form-item label="状态" :label-width="formLabelWidth" prop="enabled">-->
                <!--                    <el-input v-model="form.enabled" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import RoleCreate from './RoleCreate'

const data = [];
let obj = {};
export default {
    name: 'UserRole',
    components: {RoleCreate},
    data() {
        this.cacheData = data.map(item => ({...item}));
        return {
            dialogFormVisible: false,
            dialogFormVisible_bdd: false,
            dialogForm_id: 0,
            dialogForm_name: '',
            dialogForm_nameZh: '',
            form: {
                id: '',
                name: '',
                nameZh: '',
                //enabled: '',
            },
            formLabelWidth: '120px',
            selectedRolesIds: [],
            roles: [],
            perms: [],
            menus: [],
            selectedRole: [],
            selectedPermsIds: [],
            selectedMenusIds: [],
            props: {
                id: 'id',
                label: 'nameZh',
                children: 'children'
            },
            data,
            searchText: '',
            searchInput: null,
            searchedColumn: '',
            editingKey: '',
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
                    }
                },
                {
                    title: '角色描述',
                    dataIndex: 'nameZh',
                    key: 'nameZh',
                    scopedSlots: {
                        filterDropdown: 'filterDropdown',
                        filterIcon: 'filterIcon',
                        customRender: 'nameZh',
                    },
                    onFilter: (value, record) =>
                        record.nameZh
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
        this.listPerms()
        this.listMenus()
    },
    methods: {
        listRoles() {
            let _this = this
            this.$axios.get('/admin/role').then(resp => {
                if (resp && resp.status === 200) {
                    _this.roles = resp.data.data
                }
            })
        },
        listPerms() {
            let _this = this
            this.$axios.get('/admin/role/perm').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.perms = resp.data.data
                }
            })
        },
        listMenus() {
            let _this = this
            this.$axios.get('/admin/role/menu').then(resp => {
                if (resp && resp.data.code === 200) {
                    _this.menus = resp.data.data
                }
            })
        },
        clear() {
            this.form = {
                id: '',
                name: '',
                nameZh: '',
                enabled: ''
            }
        },
        /*onSubmit () {
          let _this = this
          // 根据视图绑定的角色 id 向后端传送角色信息
          let perms = []
          for (let i = 0; i < _this.selectedPermsIds.length; i++) {
            for (let j = 0; j < _this.perms.length; j++) {
              if (_this.selectedPermsIds[i] === _this.perms[j].id) {
                perms.push(_this.perms[j])
              }
            }
          }
          this.$axios.put('/admin/role', {
            id: this.form.id,
            name: this.form.name,
            nameZh: this.form.nameZh,
            enabled: this.form.enabled,
            perms: perms
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
        },*/
        editRole(role) {
            this.dialogFormVisible = false
            this.selectedRole = role
            let permIds = []
            for (let i = 0; i < role.perms.length; i++) {
                permIds.push(role.perms[i].id)
            }
            this.selectedPermsIds = permIds
            let menuIds = []
            for (let i = 0; i < role.menus.length; i++) {
                menuIds.push(role.menus[i].id)
                for (let j = 0; j < role.menus[i].children.length; j++) {
                    menuIds.push(role.menus[i].children[j].id)
                }
            }
            this.selectedMenusIds = menuIds
            // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys(menuIds)
            }
        },
        onSubmit(role) {
            let _this = this
            // 根据视图绑定的角色 id 向后端传送角色信息
            let perms = []
            for (let i = 0; i < _this.selectedPermsIds.length; i++) {
                for (let j = 0; j < _this.perms.length; j++) {
                    if (_this.selectedPermsIds[i] === _this.perms[j].id) {
                        perms.push(_this.perms[j])
                    }
                }
            }
            this.$axios.put('/admin/role', {
                id: role.id,
                name: role.name,
                nameZh: role.nameZh,
                enabled: role.enabled,
                perms: perms
            }).then(resp => {
                if (resp && resp.data.code === 200) {
                    this.$message.success(resp.data.message)
                    this.dialogFormVisible_bdd = false
                    this.listRoles()
                }
            })
            this.$axios.put('/admin/role/menu?rid=' + role.id, {
                menusIds: this.$refs.tree.getCheckedKeys()
            }).then(resp => {
                if (resp && resp.data.code === 200) {
                    this.$alert(resp.data.message)
                }
            })
        },
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
                    this.listRoles()
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
                        this.listRoles()
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
        editNode: function (role) {
            this.dialogFormVisible_bdd = true
            this.selectedRole = role
            let permIds = []
            for (let i = 0; i < role.perms.length; i++) {
                permIds.push(role.perms[i].id)
            }
            this.selectedPermsIds = permIds
            let menuIds = []
            for (let i = 0; i < role.menus.length; i++) {
                menuIds.push(role.menus[i].id)
                for (let j = 0; j < role.menus[i].children.length; j++) {
                    menuIds.push(role.menus[i].children[j].id)
                }
            }
            this.selectedMenusIds = menuIds
            // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys(menuIds)
            }
        }
    }
}
</script>

<style scoped>
.add-button {
    float: left;
    margin: 18px 0 18px 10px;
}
</style>

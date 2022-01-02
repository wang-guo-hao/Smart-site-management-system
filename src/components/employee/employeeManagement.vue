<template>
    <el-container>
    <el-header background-color="#409EFF">
        <el-button type="primary" @click="dialogFormVisible = true">录入员工信息</el-button>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form"  ref="ruleNewForm">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="初始密码" :label-width="formLabelWidth">
                <el-input v-model="form.userpwd" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleNewSave">确 定</el-button>
        </div>
    </el-dialog>

        <el-dialog title="编辑员工信息" :visible.sync="dialogFormChange"  @closed="handleClose">
        <el-form :model="form"  ref="ruleForm">
            <el-form-item label="员工id" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormChange = false">取 消</el-button>
            <el-button type="primary"  @click="handleSave">确 定</el-button>
        </div>
    </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogFormPass">
            <el-form :model="form" ref="rulePwdForm">
                <el-form-item label="员工id" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form.userpwd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormPass = false">取 消</el-button>
                <el-button type="primary" @click="handlePwdSave">确 定</el-button>
            </div>
        </el-dialog>

    </el-header>

        <el-main>
    <el-table
            :data="tableData"
            border
            style="width: 100%">
        <el-table-column
                fixed
                prop="name"
                label="姓名"
                width="235">
        </el-table-column>
        <el-table-column
                prop="gender"
                label="性别"
                width="270">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="联系电话"
                width="300">
        </el-table-column>
        <el-table-column
                prop="password"
                label="初始密码"
                width="300">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="warning" size="small">删除员工</el-button>
                <el-button type="text" size="small" @click="dialogFormChange = true">编辑员工信息</el-button>
                <el-button type="text" size="small" @click="dialogFormPass = true">修改密码</el-button>
            </template>
        </el-table-column>
    </el-table>
        </el-main>
        </el-container>
</template>

<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                dialogFormChange:false,
                dialogFormPass:false,
                form: {
                    name: '',
                    gender: '',
                    phone: '',
                    password: '',
                },
                tableData: [],
                formLabelWidth: '120px'
            }
        },
        mounted(){
            this.update();
        },
        methods: {
            handleClose () {
                this.$refs.ruleForm.resetFields()
                this.form = {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            },
            handleSave() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormChange = false;
                        let fd = new FormData();
                        fd.append("id", this.form.username);
                        fd.append("name", this.form.name);
                        fd.append("gender", this.form.type);
                        fd.append("phone", this.form.desc);
                        let url = '/staff/edit';
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        this.$axios.post(url, fd, config).then(response => {
                            console.log(response.data);
                            if (response.data.code === 1) {
                                this.$message({
                                    message: '保存成功！',
                                    type: 'success',
                                    center: true
                                });
                            } else {
                                this.$message({
                                    message: '保存失败！',
                                    type: 'error',
                                    center: true
                                });
                            }
                        }).catch(err => {
                            console.log(err.response.status);
                        });
                    } else {
                        console.log('输入错误')
                    }
                })
            },
            handleNewSave() {
                this.$refs.ruleNewForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormVisible = false;
                        let fd = new FormData();
                        fd.append("name", this.form.name);
                        fd.append("gender", this.form.gender);
                        fd.append("phone", this.form.phone);
                        fd.append("password", this.form.userpwd);
                        let url = '/staff/add';
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        this.$axios.post(url, fd, config).then(response => {
                            console.log(response.data);
                            if (response.data.code === 1) {
                                this.$message({
                                    message: '保存成功！',
                                    type: 'success',
                                    center: true
                                });
                            } else {
                                this.$message({
                                    message: '保存失败！',
                                    type: 'error',
                                    center: true
                                });
                            }
                        }).catch(err => {
                            console.log(err.response.status);
                        });
                    } else {
                        console.log('输入错误')
                    }
                })
            },
            handlePwdSave() {
                this.$refs.rulePwdForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormPass = false;
                        let fd = new FormData();
                        fd.append("id", this.form.name);
                        fd.append("password", this.form.gender);
                        let url = '/staff/changePassword';
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        this.$axios.post(url, fd, config).then(response => {
                            console.log(response.data);
                            if (response.data.code === 1) {
                                this.$message({
                                    message: '保存成功！',
                                    type: 'success',
                                    center: true
                                });
                            } else {
                                this.$message({
                                    message: '保存失败！',
                                    type: 'error',
                                    center: true
                                });
                            }
                        }).catch(err => {
                            console.log(err.response.status);
                        });
                    } else {
                        console.log('输入错误')
                    }
                })
            },
            handleClick(){
                let fd = new FormData();
                fd.append("id", this.form.name);
                let url = '/staff/remove';
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.$axios.post(url, fd, config).then(response => {
                    console.log(response.data);
                    if (response.data.code === 1) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success',
                            center: true
                        });
                    } else {
                        this.$message({
                            message: '保存失败！',
                            type: 'error',
                            center: true
                        });
                    }
                }).catch(err => {
                    console.log(err.response.status);
                });
            },
            update(){
                this.$axios.get('/staff/getAll').then(response => {
                    if (response.data.code === 1) {
                        console.log(response.data.payload);
                        this.tableData =response.data.payload;
                    }
                }).catch(err=>{
                    console.log(err);
                    this.$message({
                        showClose: false,
                        message: '网络错误！',
                        type: 'error',
                        center: true
                    });
                })
            }
        }
    }
</script>

<style>
</style>
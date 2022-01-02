<template>
    <el-container>
        <el-header background-color="#409EFF">
            <el-button type="primary" @click="dialogFormVisible = true">创建小组</el-button>
            <el-dialog title="小组信息" :visible.sync="dialogFormVisible">
                <el-form :model="form"  ref="ruleNewForm">
                    <el-form-item label="小组名字" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="小组组长id" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="小组员工id集合" :label-width="formLabelWidth">
                        <el-input v-model="form.desc" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleNewSave">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改小组名字" :visible.sync="dialogFormChange"  @closed="handleClose">
                <el-form :model="form"  ref="ruleForm">
                    <el-form-item label="小组id" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新名字" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormChange = false">取 消</el-button>
                    <el-button type="primary"  @click="handleSave">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改小组组长" :visible.sync="dialogFormGrpLdr">
                <el-form :model="form" ref="ruleGrpForm">
                    <el-form-item label="小组id" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新组长id" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormGrpLdr = false">取 消</el-button>
                    <el-button type="primary" @click="handleGrpSave">确 定</el-button>
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
                        label="小组名字">
                </el-table-column>
                <el-table-column
                        prop="leaderId"
                        label="小组组长id">
                </el-table-column>
                <el-table-column
                        prop="staffs"
                        label="小组员工id集合">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="warning" size="small">删除小组</el-button>
                        <el-button type="text" size="small" @click="dialogFormChange = true">修改小组名字</el-button>
                        <el-button type="text" size="small" @click="dialogFormGrpLdr = true">修改小组组长</el-button>
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
                dialogFormGrpLdr:false,
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
                        let url = '/group/editName';
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
                        fd.append("leaderId", this.form.username);
                        fd.append("staffs", this.form.desc);
                        let url = '/group/create';
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
            handleGrpSave() {
                this.$refs.ruleGrpForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormGrpLdr = false;
                        let fd = new FormData();
                        fd.append("id", this.form.username);
                        fd.append("leaderId", this.form.name);
                        let url = '/group/editLeader';
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
                let url = '/group/remove';
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
                this.$axios.get('/group/getAll').then(response => {
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
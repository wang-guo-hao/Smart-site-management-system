<template>
    <el-container>
        <el-header background-color="#409EFF">
            <el-button type="primary" @click="dialogFormVisible = true">新建项目</el-button>
            <el-dialog title="项目信息" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="NewForm">
                    <el-form-item label="项目名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="项目描述" :label-width="formLabelWidth">
                        <el-input v-model="form.desc" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="负责人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="检查小组id" :label-width="formLabelWidth">
                        <el-input v-model="form.type" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleNewSave">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改项目" :visible.sync="dialogFormChange" @closed="handleClose">
                <el-form :model="form" ref="ruleForm">
                    <el-form-item label="项目id" :label-width="formLabelWidth">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述" :label-width="formLabelWidth">
                        <el-input v-model="form.desc" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人" :label-width="formLabelWidth">
                        <el-input v-model="form.resource" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="检查小组id" :label-width="formLabelWidth">
                        <el-input v-model="form.type" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormChange = false">取 消</el-button>
                    <el-button type="primary" @click="handleSave">确 定</el-button>
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
                        prop="id"
                        label="项目id"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="项目名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="项目描述"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="owner"
                        label="项目负责人"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="ownerPhone"
                        label="负责人电话"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="checkGroupId"
                        label="检查小组id"
                        width="150">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClickDelete(scope.row)" type="warning" size="small">删除项目</el-button>
                        <el-button type="text" size="small" @click="dialogFormChange = true">修改项目</el-button>
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
            handleSave () {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormChange = false;
                        let fd = new FormData();
                        fd.append("id", this.form.username);
                        fd.append("name", this.form.name);
                        fd.append("description",this.form.desc);
                        fd.append("owner", this.form.resource);
                        fd.append("ownerPhone", this.form.phone);
                        fd.append("checkGroupId", this.form.type);
                        let url = '/project/edit';
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        this.$axios.post(url, fd, config).then(response=>{
                            console.log(response.data);
                            if(response.data.code === 1) {
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
                        }).catch(err=>{
                            console.log(err.response.status);
                        });
                    } else {
                        console.log('输入错误')
                    }
                })
            },
            handleNewSave () {
                this.$refs.NewForm.validate((valid) => {
                    if (valid) {
                        console.log('输入正确');
                        this.dialogFormVisible = false;
                        let fd = new FormData();
                        fd.append("name", this.form.name);
                        fd.append("description", this.form.desc);
                        fd.append("owner",this.form.username);
                        fd.append("ownerPhone", this.form.phone);
                        fd.append("checkGroupId", this.form.type);
                        let url = '/project/create';
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        this.$axios.post(url, fd, config).then(response=>{
                            console.log(response.data);
                            if(response.data.code === 1) {
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
                        }).catch(err=>{
                            console.log(err.response.status);
                        });
                    } else {
                        console.log('输入错误')
                    }
                })
            },
            update(){
                this.$axios.get('/project/getAll').then(response => {
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
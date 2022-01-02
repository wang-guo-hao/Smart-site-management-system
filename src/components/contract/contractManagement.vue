<template>
    <el-container>
        <el-header background-color="#409EFF">
    <el-button type="text" @click="dialogFormVisible = true" >创建合同</el-button>

    <el-dialog title="新增合同信息" :visible.sync="dialogFormVisible"  @closed="handleClose">
        <el-form :model="form"  ref="ruleForm">
            <el-form-item label="委托方id" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="项目id" :label-width="formLabelWidth">
                <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="检查体系" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
        </div>
    </el-dialog>

    </el-header>

    <el-main>
        <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%">
            <el-table-column
                    prop="clientId"
                    label="委托方id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="projectId"
                    label="项目id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="checkSystemId"
                    label="检查体系id">
            </el-table-column>
        </el-table>
    </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "contractManagement",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [],
                formLabelWidth: '120px',
                value1: ''
            };
        },
        methods: {
            handleClose() {
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
                        this.dialogFormVisible = false;
                        let fd = new FormData();
                        fd.append("clientId", this.form.name);
                        fd.append("projectId", this.form.type);
                        fd.append("checkSystemId", this.form.desc);
                        let url = '/contract/create';
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
        }
    }
</script>


<style scoped>

</style>
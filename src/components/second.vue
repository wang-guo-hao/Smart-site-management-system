<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee">

            <el-container>
                <el-header>
                    <el-row>
                        <el-col :span="20" class="logo" >{{sysName}}</el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">尊敬的用户您好！</div></el-col>
                    </el-row>
                </el-header>

                <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1']" @open="handleOpen" @close="handleClose" @select="handleSelect">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>项目管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1"><router-link to="/project/projectManagement">项目信息</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>人员管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1"><router-link to="/employee/employeeManagement">人员信息</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-s-data"></i>结果处理</template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1"> <router-link to="/result/resultProcessing">现场检查结果</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-menu"></i>委托方管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="4-1"><router-link to="/client/clientManagement">委托方信息</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-menu"></i>合同管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="5-1"><router-link to="/contract/contractManagement">合同信息</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-menu"></i>检查小组管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="6-1"><router-link to="/group/groupManagement">小组信息</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default{
        name:'second',
        data(){
            return {
                sysName:'智慧工地管理平台'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: left;
        line-height: 60px;
    }
    .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
    }
    .logo {
        height:60px;
        font-size: 22px;
        padding-left:20px;
    }

   .el-aside {
        color: #333;
    }
</style>


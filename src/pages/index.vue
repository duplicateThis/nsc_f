<template>
    <div id="nsc">
        <el-row>
            <el-col :span='2'><h1>NSC</h1></el-col>
        </el-row>
        <el-row>
            <el-col :span='12'>
                <div id="msg"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='2'>
                <el-button>color</el-button>
            </el-col>
            <el-col :span='2'>
                <el-button>emoji</el-button>
            </el-col>
            <el-col :span='2'>
                <el-button>image</el-button>
            </el-col>
            <el-col :span='2'>
                <el-button>clear</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='10'>
                <el-input type="textarea"></el-input>
            </el-col>
            <el-col :span='2'>
                <el-button @click="sendM">send</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            id: ''
        }
    },
    sockets: {
        nameExisted () {
            alert('已存在相同昵称！')
        }
    },
    methods: {
        login (name) {
            this.$socket.emit('login', name)
        },
        sendM () {
            this.$socket.emit('req_a', 'aaass')
        }
    },
    mounted () {
        if(this.$socket.connected){
            console.log('连接成功！')
            console.log(this.$socket)
            this.$prompt('请输入昵称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({value}) => {
                this.login(value);
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' + value
                });
            }).catch(() => {
                this.$message('取消输入！')
            })
        }
    }
}
</script>

<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

#msg {
    height: 200px;
    border: 1px solid #ccc;
}
.el-row {
    margin-bottom: 20px;
}
</style>

<template>
    <div class="hello">

        <el-form :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm">
            <el-form-item
                    v-for="(record, index) in dynamicValidateForm.records"
                    :key="record.key"
            >
                <el-form-item :label="'特征值' + index" :prop="'records.'+ index + '.feature'" :rules="{
      required: true, message: '特征值不能为空', trigger: 'blur'
    }">
                    <el-input v-model="record.feature"></el-input>
                </el-form-item>

                <el-form-item :label="'目标值' + index" :prop="'records.'+ index + '.target'" :rules="{
      required: true, message: '目标值不能为空', trigger: 'blur'
    }">
                    <el-input v-model="record.target"></el-input>
                </el-form-item>
                <el-button @click="addFeatureTarget">新增</el-button>
                <el-button @click.prevent="removeRecord(record)">删除</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>

    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script scoped>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                dynamicValidateForm: {
                    records: [{
                        feature: '',
                        target: ''
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeRecord(item) {
                var index = this.dynamicValidateForm.records.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.records.splice(index, 1)
                }
            },
            addFeatureTarget() {
                this.dynamicValidateForm.records.push({
                    feature: '',
                    target: '',
                    key: Date.now()
                });
            }
        }
    }
</script>

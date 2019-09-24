<template>
    <div class="hello">
        <el-form action="http://www.baidu.com" :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm">
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

        <!--        预测重置/-->
        <el-form :inline="true" :model="dynamicValidateForm">
            <el-form-item :label="'预测值0'" :prop="dynamicValidateForm.predict" :rules="{
      required: true, message: '预测值不能为空', trigger: 'blur'
    }">
                <el-input v-model="dynamicValidateForm.predict"></el-input>
            </el-form-item>
            <el-form-item :label="'目标值0'">
                <el-input :disabled="true"></el-input>
            </el-form-item>
            <el-button :disabled="true" @click="addFeatureTarget">新增</el-button>
            <el-button @click="predictReset">预测重置</el-button>
        </el-form>
        <!--       预测重置 -->


        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>

    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script scoped>
    import axios from 'axios'
    import { MessageBox } from 'element-ui';


    export default {
        name: 'HelloWorld',
        data() {
            return {
                dynamicValidateForm: {
                    records: [{
                        feature: '',
                        target: ''
                    }],
                    predict: ''
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if (this.dynamicValidateForm.predict.trim() == '') {
                                return false;
                            }
                            axios.post('http://localhost:5000/predict', {
                                "records": this.dynamicValidateForm.records,
                                "predict": this.dynamicValidateForm.predict
                            }).then(function (response) {
                                console.log(response.data.predict)
                                MessageBox.alert("您的预测结果为："+response.data["predict"], '预测结果', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                    }
                                });
                            }, function (response) {
                                console.log(response)
                            }).catch(function (error) {
                                console.log(error)
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    }
                );
            },
            predictReset() {
                this.dynamicValidateForm.predict = ''
            },

            resetForm(formName) {
                this.predictReset();
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

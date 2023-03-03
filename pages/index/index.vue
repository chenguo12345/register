<template>
    <view class="box">
    	<main class="main">
			<view class="input-row">
				<text class="title">用户名</text>
				<u-input 
				v-model="user.value" 
				:type="user.type" 
				placeholder="请输入用户名"
				:custom-style="customStyle"/>
			</view>
			
			<view class="input-row">
				<text class="title">性别</text>
				<u-input 
				v-model="sex.value" 
				:type="sex.type" 
				@click="sex.show = true" 
				placeholder="请选择性别"
				:custom-style="customStyle"/>
				<u-action-sheet 
				:list="sex.actionSheetList" 
				v-model="sex.show" 
				@click="actionSheetCallback"></u-action-sheet>
			</view>
			
			<view class="input-row">
				<text class="title">手机号码</text>
				<u-input
				v-model="tell.value" 
				:type="tell.type" 
				placeholder="请输入手机号码"
				:custom-style="customStyle"/>
			</view>
			
			<view class="input-row verificationBox">
				<text class="title">验证码</text>
				<u-input
				v-model="verification.value" 
				:type="verification.type" 
				placeholder="请输入验证码"
				:custom-style="customStyle"/>
				<u-button
				:custom-style='buttonStyle'
				:disabled= 'verification.isDisa'
				:size='verification.size'
				:type='verification.success'
				@click='getVerificationCode'>
				{{verification.verificationCode}}
				</u-button>
			</view>
			
			<view class="input-row">
				<text class="title">密码</text>
				<u-input
				v-model="cipher.value" 
				:type="cipher.type" 
				placeholder="请输入密码"
				:custom-style="customStyle"/>
			</view>
			
			<view class="input-row">
				<text class="title">确认密码</text>
				<u-input
				v-model="confirmPassword.value" 
				:type="confirmPassword.type" 
				placeholder="请确认密码"
				:custom-style="customStyle"/>
			</view>
			
			<!-- 提交按钮 -->
			<view class="btn">
				<u-button size="default" type="success" @click="submit">提交</u-button>
			</view>
		</main>
		<!-- 由于uni中无法通过js创建元素，所以需要在页面中调用<toast />组件，再通过ref开启 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import common  from '../../common/common.js'
	export default {
		data() {
			return {
				// 输入框样式自定义
				customStyle: {
					backgroundColor: '#fff',
					padding:'0 5px 0 15px',
					flex:1
				},
				
				// 验证码按钮样式自定义
				buttonStyle: {
					marginLeft:'15px'
				},
				
				// 用户名
				user: {
					value:'',
					type: 'text',
				},
				
				// 性别
				sex: {
					value:'',
					type:'select',
					show:false,
					actionSheetList: [
						{text: '男'},
						{text: '女'},
						{text: '保密'},
					]
				},
				
				// 手机号码
				tell: {
					value: '',
					type: 'number'
				},
				
				// 验证码
				verification: {
					value: '',
					randomNumber: '',
					verificationCode: '获取验证码',
					type: 'number',
					isDisa: false,
					size: 'mini',
					success: 'success',
				},
				
				// 密码
				cipher: {
					value: '',
					type: 'password'
				},
				
				// 确认密码
				confirmPassword: {
					value: '',
					type: 'password'
				}
			}
		},
		onLoad() {
			// 添加对uniCloud的访问云函数
			uniCloud.callFunction({
				name: 'logon',
				success(res) { // success为成功时的执行函数
					console.log('云函数调用成功',res)
				}
			})
		},
		methods: {
			// 选择性别
			actionSheetCallback(index) {
				this.sex.value = this.sex.actionSheetList[index].text
			},
			
			// 获取验证码
			getVerificationCode() {
				let self = this;
				if (!this.tell.value) {
					this.$refs.uToast.show({
						title: '手机号码不能为空',
					})
					return;
				}
				
				if (!common.checkStr(this.tell.value,'mobile')) {
					this.$refs.uToast.show({
						title: '手机号码格式有误'
					})
					return
				}
				
				// 调用生成随机验证码函数
				self.generateVerificationCode()
				// 调用验证倒计时函数
				self.countDown();
			},
			
			// 3秒钟后随机生成4位验证码
			generateVerificationCode() {
				// let self = this;
				let create = setTimeout(() => {
					let num =['0','1','2','3','4','5','6','7','8','9'];
					let code = '';
					for(var i = 0; i <= 3; i++) {
						
						// //每次生成一个随机数的位置
						var randPosition = Math.floor(Math.random()*(num.length-1));
						code += num[randPosition]
					}
					this.verification.randomNumber = code
					console.log(this.verification.randomNumber)
				},3000)
			},
			
			// 验证倒计时,模拟得到验证数据
			countDown() {
				this.verification.isDisa = true; // 启用禁用属性
				let timer = 6;
				this.verification.verificationCode = "倒计时" + timer + "s";
				this.timeFun = setInterval(() => {
				    --timer;
					this.verification.verificationCode = "倒计时" + timer + "s";
					if (timer == 0) {
						this.verification.isDisa = false;
						this.verification.verificationCode = "重新发送";
						clearInterval(this.timeFun);
					}
				}, 1000);
			},
			
			// 点击提交按钮
			submit() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if(!this.user.value) {
					this.$refs.uToast.show({
						title: '用户名不能为空'
					})
					return
				}
				
				if(!this.sex.value) {
					this.$refs.uToast.show({
						title: '性别不能为空'
					})
					return
				}
				
				if (!this.tell.value) {
					this.$refs.uToast.show({
						title: '手机号码不能为空',
					})
					return;
				}
				
				if (!common.checkStr(this.tell.value,'mobile')) {
					this.$refs.uToast.show({
						title: '手机号码格式有误'
					})
					return
				}
				
				if(!this.verification.value) {
					this.$refs.uToast.show({
						title: '验证码不能为空'
					})
					return
				}
				
				if(this.verification.value != this.verification.randomNumber) {
					this.$refs.uToast.show({
						title: '验证码不正确，请重新输入'
					})
					return
				}
				
				if(!this.cipher.value) {
					this.$refs.uToast.show({
						title: '密码不能为空'
					})
					return
				}
				
				if(!common.checkStr(this.cipher.value,'pwd')) {
					this.$refs.uToast.show({
						title: '密码格式不正确：需要6-20位字母、数字、特殊符相组合'
					})
					return
				}
				
				if(!this.confirmPassword.value) {
					this.$refs.uToast.show({
						title: '确认密码不能为空'
					})
					return
				}
				
				if(this.confirmPassword.value != this.cipher.value) {
					this.$refs.uToast.show({
						title: '确认密码两次输入不一致'
					})
					return
				}
				
				let param = {
					userName: this.user.value,
					sexualDistinction: this.sex.value,
					phoneNumber: this.tell.value,
					cipher: this.cipher.value
				}
				// 全部输入正确以后，完成提交，显示注册成功
				uni.showLoading({
					title: '提交中...',
				});
				// 调用云函数
				uniCloud.callFunction({
					name: "logon",
					data: param,
					success(res) {
						console.log(res);//进行输出
						uni.showToast({
						    title: '注册成功'
						});
						uni.hideLoading();
					},
					fail(err) { //调用失败时返回的函数
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped>
page,.box{
	height: 100%;
	background-color: #f0f0f0;
}
/* 表单部分 */
.main,.input-row{
	width:100%;
	box-sizing: border-box;
	padding:15px 3%;
}
.input-row{
	padding:0 15px;
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	background-color: #fff;
}
/* 验证码输入框个别样式 */
.verificationBox{
	padding:0 0 0 15px;
}
.title{
	width:25%;
}
/* 提交按钮部分 */
.btn{
	margin-top:50px;
}
</style>

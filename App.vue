<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	
	/* 引入uView基础样式 */
	@import "uview-ui/index.scss";
	
	/* 引入公共的基础样式 */
	@import "@/static/defaultStyle.css"
</style>


// 判断类型集合
const checkStr = (str, type) => {
	switch(type) {
		case 'mobile':  // 手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'pwd':
			return /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$/.test(str)
	}
}

export default {
	checkStr
}
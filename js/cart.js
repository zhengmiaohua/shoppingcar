var vm = new Vue({
	el:'#app',
	data:{
		productList:[],
		checkAllFlag:false,
		totalPrice:0,
		delFlag:false,
		curProduct:''
	},
	filters: {
		formatMoney: (value)=>{
			return '￥' + value.toFixed(2);
		}
	},
	mounted() {
		this.$nextTick(function(){
			this.cartView();
		})
	},
	methods:{
		cartView() {
			axios.get('../data/cartData.json').then(res => {
				this.productList = res.data.result.list;
			})
		},
		changeQuan(item,way) {
			if(way > 0){
				item.productQuantity++;
			}else{
				if(item.productQuantity>1){
					item.productQuantity--;
				}
			}
			this.calcTotalPrice();
		},
		selectProduct(item) {
			if(typeof item.checked === "undefined"){
				Vue.set(item, "checked", true);//全局注册
				//this.$set(item, "checked", true);//局部注册
			}else{
				item.checked=!item.checked;
			}
			if(item.checked===false){
				this.checkAllFlag=false;
			}
			var trueLength=0;
			this.productList.forEach((item, index) => {
				if(item.checked===true){
					trueLength++;
				}
			});
			if(trueLength===this.productList.length){
				this.checkAllFlag=true;
			}
			this.calcTotalPrice();
		},
		checkAll(flag) {
			this.checkAllFlag=flag;
			this.productList.forEach((item, index) => {
				if(typeof item.checked === "undefined"){
					this.$set(item, "checked", this.checkAllFlag);//全局注册
					//this.$set(item, "checked", true);//局部注册
				}else{
					item.checked=this.checkAllFlag;
				}
			});
			this.calcTotalPrice();
		},
		calcTotalPrice() {
			this.totalPrice=0;
			this.productList.forEach((item, index) => {
				if(item.checked){
					this.totalPrice += item.productPrice*item.productQuantity; 
				}
			})
		},
		delConfirm(item) {
			this.delFlag=true;
			this.curProduct=item;
		},
		delProduct() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
		}
	}
});
Vue.filter("money", (value, type)=>{
	return "￥" + value.toFixed(2) + type;
});
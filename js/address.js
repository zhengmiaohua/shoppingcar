var vm = new Vue({
	el:"#container",
	data:{
		addressList:[],
		limitNum:3,
		curIndex:0,
		shippingMethod:1
	},
	mounted (){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed:{
		filterAddress() {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList() {
			axios.get('../data/address.json').then(res=>{
				this.addressList = res.data.result;
			})
		},
		setDefault(addressId) {
			this.addressList.forEach((item, index)=>{
				if(item.addressId===addressId){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			});
		}

	}
	
});
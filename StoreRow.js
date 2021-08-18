function StoreRow(conf={}){
	var sel = this
	this.id_arr =  conf.id_arr || []
	this.data = conf.data || []
	this.id = conf.id || 0
	this.parrent = conf.parrent
	this.data_ =  {}
	this.data_gen  = function(){
		
		sel.id_arr.forEach( function(element,index){ 
			sel.data_[element] = {}	
		})
	}
		

function whicher(data,parrent){
	Object.keys(data).forEach(key => {
    	let internalValue = data[key]
		    Object.defineProperty(data, key, {
		        get() {
		          			            return  parrent.data[key]
		        },
		        set(newVal) {
		            parrent[key] = newVal
		            
		            
		        }
		    })
		})


}

this.whicher_ = function(){ whicher(this.data_,this.parrent) }.bind(this)




}

export default StoreRow
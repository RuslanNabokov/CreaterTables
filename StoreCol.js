
function  StoreCol(conf={}) {
	// this.id_arr =  conf.id_arr || []

	this.data = conf.data || []
	this.id = conf.id || 0
	this.parrent = conf.parrent
	this.data_ =  []
	this.dic = {}
	this.data_gen = []
	this.parrent = conf.parrent


	this.sorted =   function() {
		
		this.data =  this.data.sort(function(a,b) {
		 	 	  if (a['el'] >= b['el'] ){return  1 }else{return  -1}
		 
		 })
		
	}


	function whicher_(data,data_gen,parrent){
		let dt_g = {} 
		dt_g = Object.assign({}, data);
		data_gen.push(dt_g)

		Object.keys(data).forEach(key => {
		
   			
    	Object.defineProperty(data, key, {
     	   get() { 

          		if (key == 'row'){

          			return  dt_g['row']
          		}
          		
     	    	return parrent.data[dt_g[key]]
     	   },
      	  set(newVal) {
      		      internalValue = newVal
      		      if  ( key == 'row'){
      		      		return
      		      } 
        	    	data['row']['data'][key] = internalValue
        	    	return
            	
        	}
    				})
			})
		}

		this.whicher = function (){ 
			// whicher_(this.data)
			
			 this.data.forEach( function  (element,index) {
			 	whicher_(this.data[index],this.data_gen,this.parrent)
			 }.bind(this))
			 	
			 
		}
	

}		


export default StoreCol
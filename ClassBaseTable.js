import {data} from  './data.js'




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
		

function whicher(data){
	Object.keys(data).forEach(key => {
    	let internalValue = data[key]
		    Object.defineProperty(data, key, {
		        get() {
		          
		            return  this.parrent.data[key]
		        },
		        set(newVal) {
		            this.parrent[key] = newVal
		            
		            
		        }
		    })
		})


}

whicher(this.data_)


}


function  StoreCol(conf={}) {
	this.id_arr =  conf.id_arr || []
	this.data = conf.data || []
	this.id = conf.id || 0
	this.parrent = conf.parrent
	


}



function BaseStore(conf={} ){
	let sel  = this
	console.log(conf)
	this.name =  conf.name || 'Name'
	this.type = conf.type  || 'local'
	this.data_in = conf.data_in || []
	this.data = {}
	this.rows_ = []
	this.cols = []
	this.gen_ =  function (argument) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
	}

	
	for(var i=0;i<sel.data_in[0].length;i++){ 
		sel.cols[i] =  new StoreCol({'id':i,'parrent':this})  
	}
	this.data_in.forEach( function(element, index) {
	
		sel.rows_.push(new StoreRow({'data':{...element} ,'id':index, 'parrent':sel}))
		let gen = ''
		
		for(var i=0;i<element.length;i++){ 
			gen = sel.gen_()
			sel.data[gen] = element[i]
			
			sel.rows_[index]['id_arr'][i] = gen 
			
			sel.cols[i].id_arr.push(gen)
			sel.cols[i].data.push(element[i])



		}
	

	})
	sel.rows_.map(function(element,index){
		element.data_gen()
	})
	;

function whicher(data){
Object.keys(data).forEach(key => {
    let internalValue = data[key]
   
    Object.defineProperty(data, key, {
        get() {
          
            return internalValue
        },
        set(newVal) {
            internalValue = newVal
            return
            
        }
    })
})


}


whicher(this.data)





this._generate_id = function(){
		var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
	}




}


// StoreRows.prototype = Object.create(BaseStore.prototype)
// StoreCols.prototype = Object.create(BaseStore.prototype)
// Object.defineProperty(StoreRows.prototype, 'constructor', {
//     value: StoreRows,
//     enumerable: false,
//     writable: true });
// Object.defineProperty(StoreCols.prototype, 'constructor', {
//     value: StoreCols,
//     enumerable: false,
//     writable: true });


function Create_table(conf={}){


	this.col_len =  3
	 // conf.col_len ||  conf.data[0].length || 1
	this.name_cols =   conf.name_cols  || new Array('1','2','3','4')
	this.data =   new BaseStore({'data_in':conf.data}).data

	this.style_ = conf.style || 'classic'
	this.class_dict =  conf.class_dict || {'head': 'head',
						 					'cols_head':'cols_head',
						 					'cols':'cols'}



	this.parrent_element = conf.parrent_element || 'body'


	this.sort_table_by = function(row){ 
 		
		 let arr =  Array.from(this.table.rows).slice(1)
		 arr.sort((a,b) => a.cells[row].innerHTML >  
		 									 b.cells[row].innerHTML ? 1: -1   )
		 let table_ =  document.getElementById(this.table_id)
		 console.log(table_)
		 if (table_ != 'undefined'){
		 	console.log(table_)
		 
		
		 table_.parentNode.removeChild(table_);
		 table_.remove()
			}
		 this.data = arr
		 
		 this.draw_table()
	} 


	this._draw_header = function(){ 
		   this.table = document.createElement('table');
		   this.table_id = 'ccc'
		   this.table.setAttribute('id', this.table_id)
		   let tr =  document.createElement('tr')
		   for(var i = 0; i < this.col_len; i++){

		   	 	let th =  document.createElement('th')
		   	 	th.setAttribute('id-col',i)
		   	 	th.addEventListener('click',function(elem){ let id = elem.srcElement.getAttribute('id-col');this.sort_table_by(id )   }.bind(this))

		   	 	tr.appendChild(th)
		   	 	this.table.appendChild(tr)
		   	 	th.innerHTML = i
		   }


	}
	this._draw_body = function(){
			let   body = document.createElement("tbody")
			let  col_on_page = 0
			let tr  = document.createElement('tr')
			let sel = this
			let td
			Object.entries(this.data).forEach( function(element, index) {
			
			  if (col_on_page == sel.col_len ){
			  	body.appendChild(tr)
			 
			  	tr  = document.createElement('tr')
			  	col_on_page = 0
			  }

			   td = document.createElement('td')
			    	td.innerHTML =element.slice(1)
			    	tr.appendChild(td)
			    	
			    col_on_page +=1
			  
		
			    	 
			});

				this.table.appendChild( body)	 		
			}
				
	
	this.draw_table  = function(){
				this._draw_header()
				 this._draw_body()
				 var tg = document.getElementById('main')
					tg.appendChild(this.table)
				// console.log(this._header)
				// tg.innerHTML = this._header + this._body + '</table></div>'

	}			
}


let table2 =  new Create_table({
								'data':data 
											})
table2.draw_table()

// table2.sort_table_by(2)


let store = new BaseStore({'data_in':data })
console.log(store)


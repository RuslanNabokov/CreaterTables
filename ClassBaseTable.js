import {data} from  './data.js'
import StoreRow from './StoreRow.js'
import StoreCol from './StoreCol.js'







function BaseStore(conf={} ){
	let sel  = this

	this.name =  conf.name || 'Name'
	this.type = conf.type  || 'local'
	this.data_in = conf.data_in || []   // [ [1,2,3],[1,2,3]]
	this.data = {}
	this.rows_ = []
	this.cols_ = []

	this.gen_ =  function (argument) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
	}

	
	for(var i=0;i<sel.data_in[0].length;i++){ 
		sel.cols_[i] =  new StoreCol({'id':i,'parrent':this,'data':[],'parrent':this })  
	}

	this.data_in.forEach( function(element, index) {
	
		sel.rows_.push(new StoreRow({'data': {}, 'id':index, 'parrent':sel}))
		let gen = ''
		for(var i=0;i<element.length;i++){ 
			gen = sel.gen_()
			sel.data[gen] = element[i]
			sel.rows_[index]['id_arr'][i] = gen 
			sel.cols_[i].data.push({'row':sel.rows_[index],'el':gen})



		}
	})
	this._groupe_by = function(colums_array,data){
		
			let arr_val = new Array()
			let groups = {}
				if (data.length <= 1 ){
					return data
				}

				for (let i = 0; i < data.length; i++) {
					
					let key = data[i].id_arr[colums_array[0]]

					// console.log(key)id_arr[colums_array[0]]]
					// console.log( Object.keys(data[i].data_) )
					
					let val = data[i].data_[key]
				
					if (arr_val.includes(val) ){
						groups[val].push(data[i])
					}else{ 
							arr_val.push(val)
							groups[val] = []
							groups[val].push(data[i]) 

					}
				}

			if (colums_array.length <= 1){

				return groups
			}else{ 
				let keys = Object.keys(groups)

				for (let n = 0; n < keys.length; n++) {
										// console.log(groups[keys[i]])
					// console.log(sel.groupe_by(colums_array.slice(1), groups[keys[i]]))
					
					groups[keys[n]] = sel._groupe_by(colums_array.slice(1), groups[keys[n]])
				}
				return groups
			}
			return   groups
	} 
	this.groupe_by = function(colum){
		return this._groupe_by(colum,this.rows_)
	}
	// this.groupe_by = function(colums){
	// 	let arr_val = new Array()
	// 	let groups = {}
	// 	for (var i = 0; i < this.rows_.length; i++) {
	// 		let key = Object.keys(this.rows_[i].data_)[colum]
	// 		let val = this.rows_[i].data_[key]
	// 		if (arr_val.includes(val) ){
	// 			groups[val].push(this.rows_[i])
	// 		}else{ 
	// 			arr_val.push(val)
	// 			groups[val] = []
	// 		}
	// 	}
	// 	return groups
	// }
	sel.rows_.map(function(element,index){
		element.data_gen()
		element.whicher_()

	})
	sel.cols_.map(function(element,index){
		element.whicher()
		element.sorted()
			})

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
	this.data =   new BaseStore({'data_in':conf.data})
	this.sorted = 0
	this.style_ = conf.style || 'classic'
	this.class_dict =  conf.class_dict || {'head': 'head',
						 					'cols_head':'cols_head',
						 					'cols':'cols'}



	this.parrent_element = conf.parrent_element || 'body'


	this.sorted_by = function(row){ 
 		
		 // let arr =  Array.from(this.table.rows).slice(1)
		let arr =  this.data
		
		 let table_ =  document.getElementById(this.table_id)
		
		 if (table_ != 'undefined'){
		 	
		 
		
		 table_.parentNode.removeChild(table_);
		 table_.remove()
			}
		this.sorted = row
		 
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
		   	 	th.addEventListener('click',function(elem){ let id = elem.srcElement.getAttribute('id-col');this.sorted_by(id )   }.bind(this))

		   	 	tr.appendChild(th)
		   	 	this.table.appendChild(tr)
		   	 	th.innerHTML = i
		   }


	}
	this._drow_row = function(data){
		// let table_ =  document.getElementById(this.table_id)

		let tr  = document.createElement('tr')
		let td
			for (let i in data  ){

					td = document.createElement('td')
					td.setAttribute('id',i)

					 td.innerHTML = data[i] || ''
				
					 tr.appendChild(td)
				}
				return tr

	}
	//id_arr
	this._rec_draw_group = function(data,parrent=0){
		let td
		let rows =  []
		var current_id =  parrent+1 
		if (Array.isArray(data)){

			 for (var i = 0; i < data.length; i++) {
			 		 var arr =  []
			 		for (var c=0;c<data[i].id_arr.length;c++){
			 			let cur_id =  data[i].id_arr[c]
			 			
			 			arr.push(data[i].data_[cur_id])
			 		} 
			 		
			 		let row = this._drow_row(arr)
			 		row.setAttribute('parrent-id',parrent)
			 		rows.push(row)

					
			 }
			 return rows

		}else{
				
			
			Object.entries(data).forEach(function(entry){
				const [key, value] = entry;
				let  row =  document.createElement('tr')
				row.setAttribute('data-id',current_id)
				// let div = document.createElement('div')
				row.className =  'main'
				if ( parrent != 0){
					row.setAttribute('data-parrent',`${parrent}`)
				}
				// div.innerHTML = 'group_by ' +  key
				row.innerHTML = 'Group by ' + key
				// row.appendChild(div)
				row.onclick = function(){
					
					function  rec(current_id) {
						let arr = document.querySelectorAll(`[parrent-id='${current_id}']`)
						debugger
						let children_arr = Array.from(arr).map(function(arg) {
						if (arg.classList.contains('main') ){ 
									rec(arg.getAttribute('data-id'))
							}
						for (var i = 0; i < arr.length; i++) {
							
							arr[i].hidden=true
						}
						})
					}
				
					rec(current_id)

				}
				rows.push(row)
				rows.push(...this._rec_draw_group(value,current_id)   ) 
  				
			}.bind(this) ) 
			
			return rows

		}
	
	}


	// } 
	this._draw_group = function(colum){
			this._draw_header()
			let table = this.table
			let   body = document.createElement("tbody")
		
			
			if (table && table.parentNode ){
				
				table.parentNode.removeChild(table_);
				table.remove()
			}

			let data  = this.data.groupe_by(colum)
			let tr
			let td
			let rows = this._rec_draw_group(data)
			
			for  (let i of rows){
					body.appendChild(i)
			  }
			
			table.appendChild(body)
			var tg = document.getElementById('main')

			tg.appendChild(this.table)
	}
	this._draw_body = function(){
			let   body = document.createElement("tbody")
			let sel = this
			let data
			let tr
			
			
			this.data.cols_[this.sorted].data.forEach( function(element, index) {				
				data = element.row.data_
				tr = sel._drow_row(data)
				body.appendChild(tr)
// 
			  // if (col_on_page == sel.col_len ){
			  // 	body.appendChild(tr)
			 
			  // 	tr  = document.createElement('tr')
			  // 	col_on_page = 0
			  // }

			  //  td = document.createElement('td')
			  //   	td.innerHTML =element.slice(1)
			  //   	tr.appendChild(td)
			    	
			  //   col_on_page +=1
			    	 
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


// table2.sorted_by(2)
table2._draw_group([0,1])
document.table = table2
// let store = new BaseStore({'data_in':data })
// store.groupe_by([0])



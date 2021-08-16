
function BaseStore(conf={} ){
	sel  = this
	this.name =  conf.name || 'Name'
	this.type = conf.type  || 'local'
	this.data_in = conf.data_in || []
	this.data = {}
	this.gen_ =  function (argument) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
	}

	
	this.data_in.forEach( function(element, index) {
		let arr_hash = {} 
		for(var i=0;i<element.length;i++){ sel.data[sel.gen_()] = element[i] }
	

	});



Object.keys(this.data).forEach(key => {
    let internalValue = this.data[key]
    

   

    Object.defineProperty(this.data, key, {
        get() {
          
            return internalValue
        },
        set(newVal) {
            internalValue = newVal
            return
            
        }
    })
})







this._generate_id = function(){
		var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
	}




}




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
 		console.log(row)
		 let arr =  Array.from(this.table.rows).slice(1)
		 arr.sort((a,b) => a.cells[row].innerHTML >  
		 									 b.cells[row].innerHTML ? 1: -1   )
		 console.log(this.table.tBodies[0])
		 this.table.tBodies[0].append(...arr);
	} 


	this._draw_header = function(){ 
		   this.table = document.createElement('table');
		   let tr =  document.createElement('tr')
		   for(var i = 0; i < this.col_len; i++){
		   	 	let th =  document.createElement('th')
		   	 	tr.appendChild(th)
		   	 	this.table.appendChild(tr)
		   	 	th.innerHTML = i
		   }


	}
	this._draw_body = function(){
			var   body = document.createElement("tbody")
			let  col_on_page = 0
			let tr  = document.createElement('tr')
			var sel = this
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

var bears = [
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],
  ['v','b','400 lbs'],
    ['a','c','240 lbs'],
  ['b','a','350 lbs'],





];

let table2 =  new Create_table({
								'data':bears
											})
table2.draw_table()

table2.sort_table_by(2)


let store = new BaseStore({'data_in':bears})
console.log(store)


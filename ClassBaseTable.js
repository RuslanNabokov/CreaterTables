function class_(name){
	this.name = name
	return function  () {
		 return  this.name
	}
}

var t  =  new class_('ClassName')

console.log(t)
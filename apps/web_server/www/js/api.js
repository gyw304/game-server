var api = {
	'login' : 'http://www.baidu.com&login'
}


var request = function(url,type,dataType,param,callback){
    $.ajax({
        type: type,
        url: url,
        // data to be added to query string:
        data: param,
        // type of data we are expecting in return:
        dataType: dataType,
        success: function(data){
            if(typeof callback === 'function'){
                callback(data)
            }
            else{
                console.log('error')
            }
        },
        error: function(xhr, type){
            console.log('error!@@@')
        }
    })
}

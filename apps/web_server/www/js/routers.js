const Login = Vue.extend({
	template: '#Login',
	data: function() {
		return {

		}
	},

	methods: {
		login : function(){
			
			window.localStorage.setItem('token','123123aaa')
			router.push({ path: '/main'})
			
			// request(api.login,'POST','JSONP',{},function(res){
			// 	
			// })
			
		}
	}
})

const Main = Vue.extend({
	template: '#Main',
	data: function() {
		return {
			
		}
	},
	methods: {
		
	}
})


const routes = [
	
	{path: '/',name: '/',meta:{auth : false},component: Login},
	/* 
		登录页路由
	 */
	{path: '/login',name: 'login',meta:{auth : false},component: Login},
	/* 
		主页面路由
	 */
	{path: '/main',name: 'main',meta:{auth : true},component: Main},

]
const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  if(to.matched.some( m => m.meta.auth)){
		if(to.name=='login'){
      next();
    }else{
			if(window.localStorage.getItem('token')){
				next();
			}
			else{
				next('/login');
			}
		}
	}else{
    next()
	}
})

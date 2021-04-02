/* Add your Application JavaScript */


const Home = { 
  name: 'Home',   
  template: 
  `  
      <div class="home">
              <img src="/static/images/logo.png" alt="VueJS Logo">        
              <h1>{{ welcome }}</h1>      
      </div>      
              `,   
  data() {
      return {    
          welcome: 'Hello World! Welcome to VueJS'       
              } 
            }
          };
    

const NewsList = {
  name: 'NewsList',    
  template: 
  `
  <div class="form-inline d-flex justify-content-center">
      <div class="form-group mx-sm-3 mb-2">   
            <label class="sr-only" for="search">Search</label>   
          <input type="search" name="search" v-model="searchTerm"id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" /> 
                  <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
      </div>
  </div>

  <h1 class ="head"> News </h1>
  <div class="news d-flex align-content-start justify-content-center flex-wrap">
    <div  v-for="article in articles" class="news__item  article ">

    <div class = "edge bg-primary border-top"></div>
        <h5 class="title">{{ article.title }}</h5>

        <div class = "text-center">  
          <img class= "img-fluid rounded":src="article.urlToImage">
        </div>

        <p>{{ article.description }}</p>
    </div>
        `,    
  created() {
    let self = this;
      fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=')
                .then(function(response) {            
                  return response.json(); 
                })          
                .then(function(data) {            
                  console.log(data);  
                  self.articles = data.articles;        
                });    
              },
              data() { 
                return {     
                        articles: [],
                        searchTerm: ''
                      }   
                },
        methods: {
          searchNews: function() {
            let self = this;
            fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=')
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              console.log(data);
              self.articles = data.articles;
            });
          }
        }
    }
          
  const app = Vue.createApp({ 
    data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  },
    components: {    
      'home': Home,    
      'news-list': NewsList  
    }
  });        

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),  
    routes: [  
          { path: '/', component: Home },      
          { path: '/news', component: NewsList 
        } 
        ]});
          
app.component('app-header', {
  name: 'AppHeader',
  template: `
  <header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#">VueJS App</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
                 <li>
<router-link to="/" class="nav-link">Home</router-link>  
</li>
                <li>
<router-link to="/news" class="nav-link">News</router-link>  
</li>
      </ul>
    </div>
  </nav>
</header>  
  
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})




app.use(router)
app.mount('#app');






 
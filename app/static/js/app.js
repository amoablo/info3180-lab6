/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

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
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
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

app.component('news-list', {
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
     fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=b2d736b26c474ff79164081311cb0e57',
      {    headers: { 
               'Authorization': 'Bearer <b2d736b26c474ff79164081311cb0e57>'
              }
            })
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
                    fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=b2d736b26c474ff79164081311cb0e57')
                    .then(function(response) {
                      return response.json();
                    }).then(function(data) {
                      console.log(data);
                      self.articles = data.articles;
                    });
                  }
                }
            });

app.mount('#app');






 
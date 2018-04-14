// pages/movie-more/movie-more.js
Page({
  data: {
    title:{},
    url:{},
    count:20,
    movies:[]
  },
  onLoad: function (options) {
    var category = options.category;
    switch (category) {
      case "正在热映":
        var url = "https://api.douban.com/v2/movie/in_theaters"
        var title = "正在热映"
        break;
      case "即将上映":
        var url = "https://api.douban.com/v2/movie/coming_soon"
        var title = "即将上映"
        break;
      case "Top250":
        var url = "https://api.douban.com/v2/movie/top250"
          var title = "Top250"
        break;
    }
    this.getMovieListData(url);
    this.setData({
      title:title,
      url:url
    })
//设置当前页面的标题(ready时)
  wx.setNavigationBarTitle({
  title: this.data.title
})


  },

  onScrollLower:function(event){
    var count = this.data.count;
    var url = this.data.url;
    var nextUrl = url + "?start=" +count;
    this.getMovieListData(nextUrl);
    count = count + 20;
    this.setData({
      count:count
    })
    console.log("onScrollLower")
  },

  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data.subjects);
      }
    })
  },

  processDoubanData:function (doubanData) {
    var movies = [];
    for (var idx in doubanData) {
      var title = doubanData[idx].title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }

      var temp = {
        title: title,
        movieImg: doubanData[idx].images.large,
        average: doubanData[idx].rating.average,
        stars: doubanData[idx].rating.stars,
        id: doubanData[idx].id
      }

      movies.push(temp);
    }

    var dataMovies = this.data.movies
    var totalMovies = dataMovies.concat(movies);

    this.setData({
      movies:totalMovies
    });
  },

onReady:function(options){
  //设置当前页面的标题(ready时)
  wx.setNavigationBarTitle({
  title: this.data.title
})
}


})
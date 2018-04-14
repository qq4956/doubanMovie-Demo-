

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {

    var inTheatersUrl = "https://api.douban.com/v2/movie/in_theaters?count=3";
    var comingSoonUrl = "https://api.douban.com/v2/movie/coming_soon?count=3";
    var top250Url = "https://api.douban.com/v2/movie/top250?count=3";
    this.getMovieListData(inTheatersUrl, "正在热映", "inTheaters");
    this.getMovieListData(comingSoonUrl, "即将上映", "comingSoon");
    this.getMovieListData(top250Url, "Top250", "top250");

  },

  getMovieListData: function (url, categoryTitle, settedKey) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data.subjects, categoryTitle, settedKey);
      }
    })
  },

  processDoubanData: function (doubanData, categoryTitle, settedKey) {
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

    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categoryTitle: categoryTitle
    }
    this.setData(readyData);
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "../movie-more/movie-more?category=" + category
    })
  }
})
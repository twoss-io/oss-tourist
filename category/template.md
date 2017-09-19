<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <!--<script type="text/javascript" src="vendor/jquery/jquery-latest.min.js"></script>-->
  <script type="text/javascript" src="js/jquery-latest.min.js"></script>

  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/4-col-portfolio.css" rel="stylesheet">
  <!--TAB-->
  <!--J-Youtube-->
  <style type="text/css">
    iframe {
      max-width: 100%;
    }

    table,
    th,
    td {
      border: 1px solid black;
    }

    ul.playlist {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul.playlist li {
      margin-bottom: 5px;
    }

    ul.playlist li a img {
      border: 0;
      vertical-align: middle;
    }

    #sidebar-wrapper {
      top: 52px;
      left: -100px;
      width: 120px;
      background-color: #666699;
      color: white;
      position: fixed;
      height: 100%;
      z-index: 1;
    }

    .sidebar-nav {
      position: absolute;
      top: 0;
      margin: 0;
      padding: 0;
      width: 250px;
      text-align: left;
      list-style: none;
    }

    .sidebar-nav li {
      text-indent: 20px;
      line-height: 50px;
    }

    .sidebar-nav li a {
      color: white;
      display: block;
      text-decoration: none;
    }

    .sidebar-nav li a:hover {
      background: rgba(255, 255, 255, 0.25);
      color: white;
      text-decoration: none;
    }

    .sidebar-nav li a:active,
    .sidebar-nav li a:focus {
      text-decoration: none;
    }

    #sidebar-wrapper.sidebar-toggle {
      transition: all 0.3s ease-out;
      margin-left: -200px;
    }

    @media (min-width: 768px) {
      #sidebar-wrapper.sidebar-toggle {
        transition: 0s;
        left: 200px;
      }
    }
  </style>
  <script type="text/javascript">
    function adjustIframes() {
      $('iframe').each(function () {
        var
          $this = $(this),
          proportion = $this.data('proportion'),
          w = $this.attr('width'),
          actual_w = $this.width();

        if (!proportion) {
          proportion = $this.attr('height') / w;
          $this.data('proportion', proportion);
        }

        if (actual_w != w) {
          $this.css('height', Math.round(actual_w * proportion) + 'px');
        }
      });
    }
    $(window).on('resize load', adjustIframes);
  </script>
  <script type="text/javascript">
      $(function () {
        var thumbSize = 'large',		// 設定要取得的縮圖是大圖還是小圖
          // 大圖寬高為 480X360；小圖寬高為 120X90
          imgWidth = '240',			// 限制圖片的寬及 YouTube 影片的寬
          imgHeight = '180',			// 限制圖片的高及 YouTube 影片的高
          autoPlay = '&autoplay=1',	// 是否載入 YouTube 影片後自動播放；若不要自動播放則設成 0
          fullScreen = '&fs=1';		// 是否允許播放 YouTube 影片時能全螢幕播放

        $('ul.playlist>li>a').each(function () {
          //$('ul.playlist>table>tr>td>li>a').each(function(){
          // 取得要連結轉換的網址及訊息內容
          var _this = $(this),
            _url = _this.attr('href'),
            _info = _this.text(),
            _type = (thumbSize == 'large') ? 0 : 2;

          // 取得 vid
          var vid = _url.match('[\\?&]v=([^&#]*)')[1];

          // 取得縮圖
          var thumbUrl = "http://img.youtube.com/vi/" + vid + "/" + _type + ".jpg";

          // 把目前超連結的內容轉換成圖片並加入 click 事件
          _this.html('<img src="' + thumbUrl + '" alt="' + _info + '" title="' + _info + '" width="' + imgWidth + '" height="' + imgHeight + '" />').click(function () {
            return false;
          }).focus(function () {
            this.blur();
          }).children('img').click(function () {
            // 當點擊到圖片時就轉換成 YouTube 影片
            var swf = '<object width="' + imgWidth + '" height="' + imgHeight + '">';
            swf += '<param name="movie" value="http://www.youtube.com/v/' + vid + autoPlay + fullScreen + '"></param>';
            swf += '<param name="wmode" value="transparent"></param>';
            swf += (fullScreen == '&fs=1') ? '<param name="allowfullscreen" value="true"></param>' : '';

            swf += '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + vid + autoPlay + fullScreen + '" ';
            swf += (fullScreen == '&fs=1') ? 'allowfullscreen="true" ' : '';
            swf += 'wmode="transparent" width="' + imgWidth + '" height="' + imgHeight + '""></embed>';

            swf += '</object/>';

            $(this).parent('a').html(swf);

            return false;
          });
        });
      });
  </script>

</head>

<body>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
        aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <!--
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            -->
          <li class="nav-item">
            <a class="nav-link" href="https://twoss-io.github.io/#about">關於我們</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://twoss-io.github.io/#contact">聯絡我們</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://twoss-io.github.io/Projects.html">討論群組</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">
      <small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Category Name</small>
    </h1>
    <!--Start Add Side Bar-->


    <div class="row">

      <div class="col-lg-3 col-md-3 col-sm-6 portfolio-item">
        <div class="card h-100">
          <!--<a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>-->
          <ul class="playlist">
            <li><a href="">
                </a></li>
          </ul>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#"></a>
            </h4>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 portfolio-item">
        <div class="card h-100">
          <!--<a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>-->
          <ul class="playlist">
            <li><a href="http://www.youtube.com/watch?v=Qz5gyDenqTI">
               </a></li>
          </ul>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#"></a>
            </h4>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6 portfolio-item">
        <div class="card h-100">
          <!--<a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>-->
          <ul class="playlist">
            <li><a href="">
               </a></li>
          </ul>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">
                  </a>
            </h4>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
      <!--slideshare-->
      <div>
        <table>
          <tr>
            <td>
              Slide
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td>
              <iframe frameborder="0" height="200" src="https://www.slideshare.net/slideshow/embed_code/key/zEBAQVcYLgeBOe" width="300"></iframe>
              <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/bpiatt/openstack-tutorial" title="OpenStack Tutorial" target="_blank">OpenStack Tutorial</a> </strong>                from <strong><a href="https://www.slideshare.net/bpiatt" target="_blank">Bret Piatt</a></strong> </div>
            </td>
            <td>
             
            </td>
            <td>
             
            </td>
            <td>
             
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
             
            </td>
            <td>
             
            </td>
            <td>
             
            </td>
            <td>
             
            </td>
            <td>
             
            </td>
          </tr>
        </table>
      </div>
      <!--slideshare-->
      <!--blog-->
      <div>
        <table>
          <tr>
            <td>
              Blog
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td>
              <a href="http://blog.flux7.com/blogs/openstack/tutorial-what-is-cinder-and-how-to-install-and-use-it">Cinder Storage | Installation & Usage - Flux7 Blog</a>
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
             
            </td>
            <td>
              
            </td>
            <td>
             
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tr>
          <tr>
            <td>
              
            </td>
            <td>

            </td>
            <td>

            </td>
            <td>

            </td>
            <td>

            </td>
          </tr>
        </table>
      </div>
      <!--blog-->
    </div>
  </div>

  <!-- /.row -->

  <!-- Pagination -->
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
    </li>
  </ul>

  </div>
  <!-- /.container -->

  <!-- Footer -->
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Your Website 2017</p>
    </div>
    <!-- /.container -->
  </footer>

  <!-- Bootstrap core JavaScript -->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/popper/popper.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

</body>

</html>
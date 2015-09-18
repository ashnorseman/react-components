<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{%= o.htmlWebpackPlugin.options.description %}">
    <link rel="apple-touch-icon" href="">
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" href="/src/common/fonts/iconfont.css">
    {% for (var css in o.htmlWebpackPlugin.files.css) { %}
      <link rel="stylesheet" href="{%= o.htmlWebpackPlugin.files.css[css] %}">
    {% } %}
    <title>积分商城</title>
  </head>
  <body>
    <div id="app"></div>
    <!--<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>-->
    {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
      <script src="{%= o.htmlWebpackPlugin.files.chunks[chunk].entry %}"></script>
    {% } %}
  </body>
</html>
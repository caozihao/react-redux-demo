# react-redux-demo 
# 安装运行
1，请先确保安装了node和bower<br>
2，项目根目录下，运行 "npm install" 和 "bower install"<br>
3，运行 "npm run start"<br>
4，输入地址 localhost:3001 或者 127.0.0.1:3001，若出现页面则表示项目启动成功

#介绍
1，该项目是一个简单的cms系统demo，涉及到的技术有ReactJs,Redux,react-router,ES6,fetch,Webpack<br>
2，实现的功能有数据的增删改查（需配合接口），分页，窗口显示隐藏，都是基于Redux的模式<br>
3，前后台交互数据用的fetch代替了Ajax，数据传输方式用的是rest，展示用的是假数据，可切换为正常开发模式，把'GETLIST:"src/data/data.json"'的地址转成你的服务地址即可<br>
4，F12，console中可看见redux中数据流的变化<br>
4，封装了一些常用的模块，比如fetch获取数据的模块，分页模块<br>
5，nodeJs作为后台服务，仅用到两个功能:http模块和热加载模块<br>
6，可作为React和Redux的简单脚手架<br>
7，有问题请联系我，qq:1154791107<br>

#项目中的难点
1，初学redux，最头痛的是不知道redux运行时的流程和不知道代码该怎么放，可以参考我的关于ReactJs的博客 http://blog.csdn.net/github_37240941<br>
2，当熟悉流程后，就会发现设计state的重要性，这点非常重要！请在项目开始前仔细思考<br>

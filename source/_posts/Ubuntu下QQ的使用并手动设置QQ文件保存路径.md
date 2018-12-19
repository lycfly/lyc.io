---
title: Ubuntu下QQ的使用并手动设置QQ文件保存路径
date: 2018-12-16 20:51:26
tags: 'linux'
categories: '技术文'
---

# 背景&&目标

腾讯迟迟不肯做linux版本的QQ和微信，实在抠脚。
没有办法，要在linux上使用QQ，目前我找到最好的办法就是使用wine，然而wine这个杀千刀的又是个坑货，QQ除了聊天，还有最重要的功能就是传文件啊Orz,这货不但把路径隐藏了，还藏得这么深，，，无奈只能一层一层找，在用软连接链接出来。。。

<!-- more -->

下面主要以Ubuntu16.0.4为例，安装QQ,并手动设置文件保存路径。

# ubuntu下使用wine安装QQ

 主要参考 https://blog.csdn.net/hustcw98/article/details/79323024
 下载地址：<http://yun.tzmm.com.cn/index.php/s/XRbfi6aOIjv5gwj>
 Appimage包不用做什么别的处理，安装啥的都不需要。。找到文件所在目录，终端中修改一下文件的权限

```
chmod a+x QQ-20171129-x86_64.AppImage
```

之后就可以直接运行了。。。

```
./QQ-20171129-x86_64.AppImage
```

 然而作为深度windows依赖患者，自然不会习惯开个qq还要敲命令
 索性在把它固定到开始栏：
 首先把QQ-20171129-x86_64.AppImage 名字改的简单点，移动到linux下的/opt下：
 先cd到QQ-20171129-x86_64.AppImage所在路径，之后

```
sudo mv QQ-20171129-x86_64.AppImage /opt/QQ
```

再创建个启动器：

```
sudo gedit /usr/share/applications/QQ.desktop
```

将以下内容复制进去：

```
[Desktop Entry] 
Name=QQ
Name[zh_CN]=QQ
Exec=/opt/QQ
Icon=/opt/QQ.png
Terminal=false
X-MultipleArgs=false
Type=Application
Encoding=UTF-8
Categories=Application;
StartupNotify=false
```

其中，QQ.png图标可以从网上随便找一个图标放到/opt或者随便什么路径，只要desktop里填写正确路径即可。
 如此QQ就可以像windows里一样打开了，可能还要手动固定到任务栏，这个就不提了。

# 创建QQ文件保存路径

这种方法安装的QQ实际是基于wine的。。。如果你在里面接收文件，想要找到路径，这货显示的是windows里一样的路径，还有什么还有“我的电脑”。。。linux里哪来这玩意
 所以实际他把存的文件放在了一个隐藏文件夹里，在home/你的用户名 目录下按CTRL+h 显示隐藏文件，找到里面一个叫

```
.QQ.unionfs
```

的文件夹，从QQ里接到的文件都放在

```
.QQ.unionfs/drive_c/users/你的用户名/My Documents/Tencent Files
```

文件下了。
 所以可以在自己在外面创建一个该文件夹的软连接，方便找文件：

```
sudo ln -s /home/你的用户名/.QQ.unionfs/drive_c/users/你的用户名/My\ Documents/Tencent\ Files /home/你的用户名/
```

大功告成！如此便可在linux下愉快的使用QQ了！
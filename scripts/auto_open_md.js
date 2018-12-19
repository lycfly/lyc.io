var spawn = require('child_process').exec;

hexo.on('new', function(data){
  spawn('start  "F:\Typora\Typora.exe" ' + data.path);
});
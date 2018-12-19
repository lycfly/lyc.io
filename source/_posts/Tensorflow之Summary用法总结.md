---
title: Tensorflow之Summary用法总结
date: 2018-12-16 21:05:08
tags: 'Tensorflow'
categories: '技术文'
---

# Tensorflow之Summary用法总结

最近在研究tensorflow自带的例程speech_command,顺便学习tensorflow的一些基本用法。

其中tensorboard 作为一款可视化神器，可以说是学习tensorflow时模型训练以及参数可视化的法宝。

而在训练过程中，主要用到了tf.summary()的各类方法，能够保存训练过程以及参数分布图并在tensorboard显示。

<!-- more -->

## tf.summary包含的诸多函数

### 1、tf.summary.scalar

用来显示标量信息，其格式为：

```python
tf.summary.scalar(tags, values, collections=None, name=None)
```

例如：tf.summary.scalar('mean', mean)

一般在画loss,accuary时会用到这个函数。

### 2、tf.summary.histogram

用来显示直方图信息，其格式为：

```python
tf.summary.histogram(tags, values, collections=None, name=None) 
```

例如： tf.summary.histogram('histogram', var)

一般用来显示训练过程中变量的分布情况

### 3、tf.summary.distribution

分布图，一般用于显示weights分布

### 4、tf.summary.text

可以将文本类型的数据转换为tensor写入summary中：

例如：

```python
text = """/a/b/c\\_d/f\\_g\\_h\\_2017"""
summary_op0 = tf.summary.text('text', tf.convert_to_tensor(text))
```

### 5、tf.summary.image

输出带图像的probuf，汇总数据的图像的的形式如下： ' tag /image/0', ' tag /image/1'...，如：input/image/0等。

格式：tf.summary.image(tag, tensor, max_images=3, collections=None, name=Non

### 6、tf.summary.audio

展示训练过程中记录的音频 

### 7、tf.summary.merge_all

merge_all 可以将所有summary全部保存到磁盘，以便tensorboard显示。如果没有特殊要求，一般用这一句就可一显示训练时的各种信息了。

格式：tf.summaries.merge_all(key='summaries')

### 8、tf.summary.FileWriter

指定一个文件用来保存图。

格式：tf.summary.FileWritter(path,sess.graph)

可以调用其add_summary（）方法将训练过程数据保存在filewriter指定的文件中

Tensorflow Summary 用法示例:

```python
tf.summary.scalar('accuracy',acc)                   #生成准确率标量图  
merge_summary = tf.summary.merge_all()  
train_writer = tf.summary.FileWriter(dir,sess.graph)#定义一个写入summary的目标文件，dir为写入文件地址  
......(交叉熵、优化器等定义)  
for step in xrange(training_step):                  #训练循环  
    train_summary = sess.run(merge_summary,feed_dict =  {...})#调用sess.run运行图，生成一步的训练过程数据  
    train_writer.add_summary(train_summary,step)#调用train_writer的add_summary方法将训练过程以及训练步数保存  
```

此时开启tensorborad：

```shell
tensorboard --logdir=/summary_dir 
```

便能看见accuracy曲线了。

另外，如果我不想保存所有定义的summary信息，也可以用tf.summary.merge方法有选择性地保存信息：

### 9、tf.summary.merge

格式：tf.summary.merge(inputs, collections=None, name=None)

一般选择要保存的信息还需要用到tf.get_collection()函数

示例：

```python
tf.summary.scalar('accuracy',acc)                   #生成准确率标量图  
merge_summary = tf.summary.merge([tf.get_collection(tf.GraphKeys.SUMMARIES,'accuracy'),...(其他要显示的信息)])  
train_writer = tf.summary.FileWriter(dir,sess.graph)#定义一个写入summary的目标文件，dir为写入文件地址  
......(交叉熵、优化器等定义)  
for step in xrange(training_step):                  #训练循环  
    train_summary = sess.run(merge_summary,feed_dict =  {...})#调用sess.run运行图，生成一步的训练过程数据  
    train_writer.add_summary(train_summary,step)#调用train_writer的add_summary方法将训练过程以及训练步数保存  
```

使用tf.get_collection函数筛选图中summary信息中的accuracy信息，这里的

tf.GraphKeys.SUMMARIES  是summary在collection中的标志。

当然，也可以直接：

```python
acc_summary = tf.summary.scalar('accuracy',acc)                   #生成准确率标量图  
merge_summary = tf.summary.merge([acc_summary ,...(其他要显示的信息)])  #这里的[]不可省
```

 如果要在tensorboard中画多个数据图，需定义多个tf.summary.FileWriter并重复上述过程。
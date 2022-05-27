//引入mockjs
import Mock from "mockjs";
//引入json数据
//webpack默认对外暴露图片和json数据格式，不需要export
import banner from './banner.json'
import floor from './floor.json'
//mock数据:第一个参数：请求数据的地址，第二个参数：请求的数据
Mock.mock('/mock/banner',{code:200,data:banner});//mock首页轮播图的数据
Mock.mock('/mock/floor',{code:200,data:floor});//模拟楼层数据


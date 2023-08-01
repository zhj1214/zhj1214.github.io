/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-07-28 15:39:16
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-31 10:07:01
 */
import Mock from "mockjs";
import { builder } from "../util";
import mockdata from "../json-db/tabb-data.json";

// 获取 mock.Random 对象
const { Random } = Mock;
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = () => {
  const newsList: any = [];
  for (let i = 0; i < 20; i++) {
    const newNewsObject = {
      //  Random.ctitle( min, max) 随机产生一个中文标题，长度默认在3-7之间
      title: Random.ctitle(),
      // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
      content: Random.cparagraph(),
      // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
      createdTime: Random.date(),
    };
    newsList.push(newNewsObject);
  }
  return newsList;
};

// 拦截该url，就可以返回newsList
Mock.mock("/mock/random/news", "get", produceNewsData());

// sptable 模拟数据
const demoSptable = () => {
  return builder(mockdata.data.data, "", 200);
};
Mock.mock(/\/demo\/sptable/, "post", demoSptable);

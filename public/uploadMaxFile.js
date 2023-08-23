/*
 * @Description: 大文件切片上传
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-01-03 16:51:11
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-08-23 14:16:51
 */
const sparkMD5 = require("spark-md5");
const FormData = require("form-data");
const Axios = require("axios");
let fs = require("fs");
// 切片大小
const CHUNK_SIZE = 8 * 1024 * 1024;
// 重试次数
const ErrorRetryCount = 1;

let http = Axios.create({
  baseURL: "http://localhost:7001/errors/sourcemap",
});
// 请求拦截
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截
http.interceptors.response.use(
  async (response) => {
    let { data, config } = response;
    // console.log("--response--", response);

    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * @description: 计算文件切片始末位置
 * createFileChunk（file） el-ui 上传组件
 * createFileStreamChunk(Stream) 上传
 * @param {*} size 默认切片大小
 */
const createFileChunk = (file, size = CHUNK_SIZE) => {
  const chunks = [];
  let cur = 0;
  const maxLen = Math.ceil(file.size / size);
  while (cur < maxLen) {
    const start = cur * size;
    const end = start + size >= file.size ? file.size : start + size;
    chunks.push({ index: cur, file: file.slice(start, end) });
    cur++;
  }
  return chunks;
};

const createFileStreamChunk = (filepath, size, length = CHUNK_SIZE) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let cur = 0;
    const maxLen = Math.ceil(size / length);
    // console.log(cur, "-maxLen--", maxLen);
    while (cur < maxLen) {
      const start = cur * length;
      const end = start + length >= size ? size : start + length;
      // console.log(start, "---", end);
      // 创建读取流
      let rs = fs.createReadStream(filepath, {
        highWaterMark: 64 * 1024 * 1024, //文件一次读多少字节,默认 64*1024
        flags: "r", // 指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
        autoClose: true, // autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
        // fd: null, // fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
        start: start, // 读取文件开始位置
        end: end, // 流是闭合区间 包含start也含end
        // encoding: "utf8", // 指定打开文件时使用编码格式，默认就是Buffer,你还可以为它指定“utf8”、”ascii”或”base64”
      });
      /**
       * @description: 在内部不断触发rs.emit('data',数据)
       * @param {*} data
       * @param {*} function chunk类型取决于 createReadStream的encoding属性
       */
      rs.on("data", function (chunk) {
        chunks.push({ index: cur, file: chunk });
        if (chunks.length >= maxLen) {
          resolve(chunks);
        }
      });
      // 监听错误
      rs.on("error", function (err) {
        console.log(err);
        reject(err);
      });
      cur++;
    }
  });
};

/**
 * @description: 根据计算的切片长度进行切片，并返回文件映射的hash值
 * calculateHash（file） el-ui 上传组件
 * calculateHashStream (Stream) 上传
 * @param {*} chunks 计算的切片信息
 */
const calculateHash = (chunks, hashProgressInfo) => {
  let count = 0;
  const len = chunks.length;
  // hash进度
  let hashProgress = 0;
  // 文件hash
  let hash;
  // hash数组
  const spark = new sparkMD5.ArrayBuffer();
  // 开始截取时间
  const startTime = new Date().getTime();

  return new Promise((resolve) => {
    const loadNext = (index) => {
      // 创建读取文件对象
      const reader = new FileReader();
      //   读取文件
      reader.readAsArrayBuffer(chunks[index].file);
      //   读取完成
      reader.onload = function (e) {
        // 读取完成时间
        const endTime = new Date().getTime();
        // 覆盖原来的切片信息
        chunks[count] = { ...chunks[count], time: endTime - startTime };
        count++;
        // 添加文件内容
        spark.append(e.target.result);
        // 是否继续读取
        if (count == len) {
          hashProgressInfo(100);
          hash = spark.end();
          resolve(hash);
        } else {
          hashProgress += 100 / len;
          hashProgressInfo(hashProgress);
          loadNext(index + 1);
        }
      };
    };
    loadNext(0);
  });
};

const calculateHashStream = (chunks, hashProgressInfo) => {
  let count = 0;
  const len = chunks.length;
  // hash进度
  let hashProgress = 0;
  // 文件hash
  let hash;
  // hash数组
  const spark = new sparkMD5.ArrayBuffer();
  // 开始截取时间
  const startTime = new Date().getTime();

  return new Promise((resolve) => {
    const loadNext = (index) => {
      // 读取完成时间
      const endTime = new Date().getTime();
      // 覆盖原来的切片信息
      chunks[count] = { ...chunks[count], time: endTime - startTime };
      count++;
      // 添加文件内容
      spark.append(chunks[index].file);
      // 是否继续读取
      if (count == len) {
        hashProgressInfo(100);
        hash = spark.end();
        resolve(hash);
      } else {
        hashProgress += 100 / len;
        hashProgressInfo(hashProgress);
        loadNext(index + 1);
      }
    };
    loadNext(0);
  });
};

/**
 * @description: 拼接需要上传的切片信息
 * @param {*} chunks 完整的原始切片数组
 * @param {*} hash 文件hash
 * @param {*} uploadedList 已存在的切片数组,断点续传才存在
 * @param {*} ext 文件扩展名
 * @return {*} 返回需要上传的切片信息
 */
const splicingUploadParams = (chunksTemp, hash, uploadedList = [], ext) => {
  // 1. 组装上传数据
  const chunks = chunksTemp.map((chunk, index) => {
    const name = hash + "-" + index;
    // 是否已上传过这个片段
    const isChunkUploaded = uploadedList.includes(name) ? true : false;
    return {
      hash,
      name,
      index,
      chunk: chunk.file,
      progress: isChunkUploaded ? 100 : 0,
    };
  });
  // console.log("chunksTemp--", chunks);

  // 2. 过滤掉已上传的切片，只上传没有的切片
  const requests = chunks
    .filter((e) => !uploadedList.includes(e.name))
    .map((chunk) => {
      let name = chunk.name;
      //  如果有切片的话，那么不能有扩展名称
      if (chunks.length === 1) {
        name += `.${ext}`;
      }
      const form = new FormData();
      // 重点来了，这里一定要有三个参数，第三个参数是 文件名称（包括扩展名）name
      form.append("name", name);
      form.append("file", chunk.chunk, name);
      form.append("hash", chunk.hash);
      // 如果是切片，那么切片目录名字应该是hash 的前 6 个字符； 如果服务端设置了目录则失效
      form.append(
        "category",
        chunks.length === 1 ? "" : chunk.hash.slice(0, 6)
      );
      //  文件扩展名
      form.append("ext", ext);
      //  如果是切片上传，则增加标识
      form.append("isSliceUpload", `${chunks.length > 1}`);
      return { form, index: chunk.index, error: 0 };
    });

  return { requests, chunks };
};

/**
 * @description: 开始上传切片
 * @param {*} url 上传地址
 * @param {*} chunks 原始chunks
 * @param {*} requests 要上传的切片数组
 * @param {*} limit 默认并发数量
 */
const startUpload = (url, chunks, requests, limit = 1) => {
  const len = requests.length;
  // 用于上传计数，判断所有切片是否都上传成功
  let count = 0;
  // 是不是中断了上传
  let isStop = false;

  return new Promise((resolve, reject) => {
    const upLoadReq = async () => {
      if (isStop) return;
      const req = requests.shift();
      if (!req) return;
      const { form, index } = req;

      // 回调函数
      const fail = () => {
        chunks[index].progress = -1;
        if (req.error < ErrorRetryCount) {
          req.error++;
          requests.unshift(req);
          upLoadReq();
        } else {
          isStop = true;
          reject();
        }
      };

      const success = (res) => {
        //最后一片
        if (count == len - 1) {
          resolve(res);
        } else {
          count++;
          upLoadReq();
        }
      };
    
      try {
        let length = await new Promise((resolve, reject) => {
          return form.getLength((err, length) =>
            err ? reject(err) : resolve(length)
          );
        });
        const res = await Axios.default({
          url: `http://localhost:7001/errors/sourcemap${url}`,
          method: "POST",
          timeout: 3000,
          data: form,
          headers: {
            ...form.getHeaders(), // 小心
            "Content-Length": length, // 谨慎
          },
          onUploadProgress: (progress) => {
            chunks[index].progress = Number(
              ((progress.loaded / progress.total) * 100).toFixed(2)
            );
          },
        });
        // console.log("--uploadstreamfile--", res.data);

        // 这里的 code 一定要对，不然会：重试请求
        if (res.data.code === 10000) {
          success(res.data);
        } else {
          fail();
        }
      } catch (error) {
        console.log("---err---", error.response);
      }

      // http
      //   .post(url, form, {
      //     onUploadProgress: (progress) => {
      //       chunks[index].progress = Number(
      //         ((progress.loaded / progress.total) * 100).toFixed(2)
      //       );
      //     },
      //   })
      //   .then((res) => {
      //     console.log("--uploadstreamfile--", res);

      //     // 这里的 code 一定要对，不然会：重试请求
      //     if (res.code === 10000) {
      //       success(res);
      //     } else {
      //       fail();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("---err---", err);

      //     fail();
      //   });
    };

    while (limit > 0) {
      setTimeout(() => {
        upLoadReq();
      }, Math.random() * 2000);
      limit--;
    }
  });
};

module.exports = {
  createFileChunk,
  createFileStreamChunk,
  calculateHash,
  splicingUploadParams,
  startUpload,
  calculateHashStream,
};

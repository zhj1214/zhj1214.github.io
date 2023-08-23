const Path = require("path");
const Fs = require("fs");
const Axios = require("axios");
const FormData = require("form-data");
const PLUGIN_NAME = "UploadSourceMapPlugin";
const {
  createFileStreamChunk,
  calculateHashStream,
  splicingUploadParams,
  startUpload,
} = require("./uploadMaxFile");
// 切片大小
const CHUNK_SIZE = 8 * 1024 * 1024;

class UploadSourceMapPlugin {
  // 读取目录下所有的 .js.map 文件
  async getAssets(distDir) {
    const files = await Fs.promises.readdir(distDir);
    return files
      .filter((el) => /\.js\.map$/i.test(el))
      .map((el) => Path.join(distDir, el));
  }

  async uploadFile(filepath) {
    var self = this;
    Fs.stat(filepath, function (err, stats) {
      // 获取文件的大小；console.log(stats.size); <br>
      // 获取文件最后一次访问的时间；<br>    console.log(stats.atime.toLocaleString());<br>
      // 文件创建的时间；<br>    console.log(stats.birthtime.toLocaleString());<br>
      // 文件最后一次修改时间；<br>    console.log(stats.mtime.toLocaleString());<br>
      // 状态发生变化的时间；<br>    console.log(stats.ctime.toLocaleString())<br>
      // 判断是否是目录；是返回true；不是返回false；<br>    console.log(stats.isFile())<br>
      // 判断是否是文件；是返回true、不是返回false；<br>    console.log(stats.isDirectory())
      // console.log(filepath, "--file--", stats.size);
      self.upload(filepath, stats.size);
    });
  }

  apply(compiler) {
    if (compiler) {
      // 路径需要与 SourceMapDevToolPlugin 插件存放 sourcemap 文件的地址一致
      const sourcemapDir = Path.join(compiler.options.output.path, "");
      compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, async () => {
        console.log("Uploading sourcemap files...");
        const files = await this.getAssets(Path.join(sourcemapDir, "js")); // 只上传 js 的 sourcemap 文件
        for (const file of files) {
          await this.uploadFile(file);
        }
        // 注意：node < 14.14.0 可以使用 Fs.promises.rmdir 替代
        await Fs.promises.rm(sourcemapDir, { recursive: true });
      });
    } else {
      // 路径需要与 SourceMapDevToolPlugin 插件存放 sourcemap 文件的地址一致
      const sourcemapDir = Path.join("dist", "");
      // console.log("--sourcemapDir--", sourcemapDir);
      (async () => {
        console.log("Uploading sourcemap files...");
        const files = await this.getAssets(Path.join(sourcemapDir, "js")); // 只上传 js 的 sourcemap 文件
        // for (const file of files) {
        //   await this.uploadFile(file);
        // }
        await this.uploadFile(files[0]);
        // 注意：node < 14.14.0 可以使用 Fs.promises.rmdir 替代
        // await Fs.promises.rm(sourcemapDir, { recursive: true });
      })();
    }
  }

  /**
   * @description: 开始切片上传
   */
  async upload(filepath, size) {
    // 根据文件大小计算切片长度
    const chunksTemp = await createFileStreamChunk(filepath, size);
    // console.log(filepath, "② 切片长度计算完成：", chunksTemp);
    // 根据切片长度进行切片 、 对整个文件进行hash
    const self = this;
    const hash = await calculateHashStream(chunksTemp, (progress) => {
      self.hashProgress = progress;
    });
    this.hash = hash;
    console.log("③ 要上传文件hash映射值：", hash);
    // 查询是否上传,或者是否继续断点上传
    try {
      const res = await Axios.default({
        url: "http://localhost:7001/errors/sourcemap/checkfile",
        method: "post",
        timeout: 10000,
        data: {
          hash,
          ext: filepath.endsWith(".js.map")
            ? "js.map"
            : Path.extname(filepath).toLocaleLowerCase(),
        },
      });

      if (!res.data || !res.data.data) {
        return;
      }
      console.log("--checkfile--", res.data);

      const { uploaded, uploadedList, filePath } = res.data.data;
      if (uploaded) {
        console.log("④ 文件已存在，无需上传");
        this.filePath = filePath;
        this.fileHas = true;
        return console.log("秒传成功");
      }
      // 组装上传数据
      const { chunks, requests } = splicingUploadParams(
        chunksTemp,
        hash,
        uploadedList,
        filepath.endsWith(".js.map")
          ? "js.map"
          : Path.extname(filepath).toLocaleLowerCase()
      );
      // 将拼接后的切片数据赋值给原始数据
      this.chunks = chunks;
      // 上传需要上传的切片信息
      this.uploadChunks(requests);
    } catch (err) {
      console.error(Path.basename(filepath), err.message);
    }
  }
  /**
   * @description: 上传需要上传的切片信息
   * @param {*} requests
   */
  async uploadChunks(requests) {
    // console.log("需要上传的切片：", requests);
    // 并发，发送切片请求 3 代表一次并发3个请求上传 uploadstreamfile
    startUpload("/uploadstreamfile", this.chunks, requests, 3).then((res) => {
      console.log("所有切片上传完成✅", res);
      this.mergeFile(res.data);
    });
  }
  /**
   * @description: 发送合并请求
   */
  mergeFile(val) {
    Axios.default({
      url: "http://localhost:7001/errors/sourcemap/mergeFile",
      method: "post",
      timeout: 10000,
      data: {
        size: CHUNK_SIZE,
        ext: val.ext,
        fileName: this.hash,
        streamDir: val.streamDir,
      },
    }).then((res) => {
      if (res && res.data) {
        this.filePath = res.data.url;
      }
    });
  }

  getSourcemap() {
    if (!this.filePath) {
      return this.$message.error("请先上传文件");
    }
    if (!this.filename || !this.filename.includes(".map")) {
      return this.$message.error("请输入正确的路径");
    }
    if (this.filename[0] != "/") {
      return this.$message.error("路径前面应该有'/'");
    }
    if (!this.row) {
      return this.$message.error("请输入行号");
    }
    if (!this.col) {
      return this.$message.error("请输入列号");
    }
    this.$http
      .post("/sourcemap/analysis", {
        hash: this.hash,
        row: this.row,
        col: this.col,
        name: this.filename,
      })
      .then((res) => {
        console.log("解析结果：", res);
        if (res.code === 200) {
          this.code = res.data;
        }
      });
  }
}

// 手动触发
const b = new UploadSourceMapPlugin();
b.apply();

module.exports = UploadSourceMapPlugin;

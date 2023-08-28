const Path = require("path");
const Fs = require("fs");
const Axios = require("axios");
var AdmZip = require("adm-zip");
const PLUGIN_NAME = "UploadSourceMapPlugin";
const {
  createFileStreamChunk,
  calculateHashStream,
  splicingUploadParams,
  startUpload,
  mkdirsSync,
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
      // console.log(filepath, "--file--", stats);
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
      var self = this;
      (async () => {
        // 1.  获取 js.map 文件列表
        const files = await this.getAssets(Path.join(sourcemapDir, "js")); // 只上传 js 的 sourcemap 文件
        // 2. 创建-压缩目录
        const zipDir = `${Path.join(sourcemapDir, "js")}/sourceMap`;
        mkdirsSync(zipDir);
        let num = 0;

        for (const file of files) {
          // 3. 复制文件到压缩目录
          const l = file.split("/");
          const name = l[l.length - 1];
          Fs.copyFile(file, zipDir + "/" + name, function () {
            ++num;
            // console.log(name, "--成功--", num, "--", files.length);
            if (num === files.length) {
              console.log("--所有文件 copy 完成--");
              // 4. 压缩文件夹
              const admzip = new AdmZip();
              admzip.addLocalFolder(zipDir); // 压缩文件 admzip.addLocalFile(`${zipDir}.zip`);
              admzip.writeZip(`${zipDir}.zip`);
              // 5. 上传压缩文件
              self.uploadFile(`${zipDir}.zip`);
              // 6. 删除 创建的目录
              Fs.promises.rm(zipDir, { recursive: true });
            }
          });
        }

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
      this.uploadChunks(requests, JSON.parse(JSON.stringify(chunks)));
    } catch (err) {
      console.error(Path.basename(filepath), err.message);
    }
  }
  /**
   * @description: 上传需要上传的切片信息
   * @param {*} requests
   */
  async uploadChunks(requests, chunks) {
    // console.log("需要上传的切片：", requests);
    // 并发，发送切片请求 3 代表一次并发3个请求上传 uploadstreamfile

    startUpload("/uploadstreamfile", chunks, requests, 3).then((res) => {
      console.log("所有切片上传完成✅", res);
      if (chunks.length > 1) {
        this.mergeFile(res.data);
      }
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
// 获取 shell 参数
const argv = process.argv;
// console.log("--argv--", argv);
// 参数字符串
const envStr = argv[2];
const params = envStr && envStr.split(":");
const key = params[0];
const value = params[1];
console.log("key：" + key);
console.log("vaklue：" + value);

// 是否手动运行
if (key === "run" && value === "true") {
  const b = new UploadSourceMapPlugin();
  b.apply();
}

module.exports = UploadSourceMapPlugin;

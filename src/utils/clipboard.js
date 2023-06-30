/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-02-17 14:22:26
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-02-17 15:57:40
 */

import Clipboard from "clipboard";

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event, {
    text: () => text,
  });

  clipboard.on("success", () => {
    window.$message.success("复制成功");
    clipboard.destroy();
  });

  clipboard.on("error", () => {
    window.$message.error("复制失败");
    clipboard.destroy();
  });

  clipboard.onClick(event);
}

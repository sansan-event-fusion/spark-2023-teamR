import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "blue.50",
        color: "gray.700",
      },
    },
  },
  colors: {
    blue: {
      700: "#1275AE",
      400: "#5FA8D3", //主にポジティブな意味のボタンに使用
      100: "#E2EAF4", //タスク一覧の背景色
      50: "#F9FBFE", //全体の背景色
    },
    yellow: {
      500: "#F7A072", //作業中タスクのアイコン
      200: "#EDDEA4", //作業中のタスク
    },
    orange: {
      300: "#B19218",
    },
    // grayは300を使う
  },
});

export { theme };

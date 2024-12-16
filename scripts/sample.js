import http from "k6/http";
import { check, sleep } from "k6";

// テストのオプション構成
export const options = {
  thresholds: {
    // リクエストの99%が3000ms以内に終了すること
    http_req_duration: ["p(99) < 3000"],
  },
  // 仮想ユーザーの数の増減設定
  stages: [
    { duration: "15s", target: 5 },
    { duration: "30s", target: 5 },
    { duration: "15s", target: 0 },
  ],
};

// テストの実行内容
export default function () {
  // API実行（例として実験用の共有テスト環境「https://test-api.k6.io」を使う）
  let res = http.get("https://test-api.k6.io/public/crocodiles/1/");
  // 実行結果の検証
  check(res, { "status was 200": (r) => r.status == 200 });
  // インターバル設定
  sleep(1);
}
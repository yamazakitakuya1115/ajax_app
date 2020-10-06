function memo() {
  const submit = document.getElementById("submit"); //投稿するボタンの情報を取得
  submit.addEventListener("click", (e) => { //投稿するボタンをクリックした時に実行される関数の定義
    const formData = new FormData(document.getElementById("form")); //フォームに入力された情報をFormDataへ定義
    const XHR = new XMLHttpRequest(); //XMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true); //XMLHttpRequestを初期化、HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.responseType = "json"; //返却されるデータ形式としてJSONを指定
    XHR.send(formData); //送信
    XHR.onload = () => {
      if (XHR.status != 200) { //200以外のHTTPステータスが返却された場合の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post; //itemはレスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list"); //listは「描画する親要素」のlistの要素を取得している
      const formText = document.getElementById("content"); //formText取得は、メモの入力フォームをリセットするため
      //HTML という変数を描画するような処理を行えば、以下で定義したHTMLが描画される。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div >
      <div class="post-content">
        ${item.content}
      </div>
        </div > `;
      list.insertAdjacentHTML("afterend", HTML); //listという要素の直後に、変数HTMLを挿入。
      formText.value = ""; //入力フォームに入力されたままの文字をリセット（空の文字列に上書き）
    };
    e.preventDefault(); //3行目のe（イベント情報）に対して処理を中止
  });
}
window.addEventListener("load", memo); //ページ読み込み時に実行されるように記述
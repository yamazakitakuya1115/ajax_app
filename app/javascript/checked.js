function check() {  //要素１つずつに対して、「クリック」した際に動作するイベント駆動 を設定する
  const posts = document.querySelectorAll(".post"); //クリックされる部分の要素を取得する
  posts.forEach(function (post) {  //それぞれの要素への処理を記述していく
    if (post.getAttribute("data-load") != null) {  //setInterval記述による問題の回避
      return null;  //イベント発火が起きている要素に data-load = "true"はまだ追加されていないため、
    }  //if文の処理は読み込まれずに、以下の行に処理が移る。
    post.setAttribute("data-load", "true");  //要素にdata-load = "true"と、属性を追加→4~6行目へ、処理が止まる
    post.addEventListener("click", () => { //処理としてaddEventListener、引数がclick
      const postId = post.getAttribute("data-id");  //メモのidを取得
      const XHR = new XMLHttpRequest();  //オブジェクトを生成（変数XHRから、XMLHttpRequestのメソッドが使用できる）
      XHR.open("GET", `/posts/${postId}`, true);  //posts/idに非同期通信ONというXMLHttpRequestのリクエストを送る
      XHR.responseType = "json";  //レスポンス形式としてJSONを指定
      XHR.send();  //リクエストを送信する
      XHR.onload = () => {  //レスポンスを受信成功したら呼び出す
        if (XHR.status != 200) {  //HTTPステータスコードが200以外ならば
          alert(`Error ${XHR.status}: ${XHR.statusText}`);  //エラーが生じたオブジェクトに含まれるエラー文のアラートを表示
          return null;  //JavaScriptの処理から抜け出す。このエラーが出たらここ以降は処理しない
        }
        const item = XHR.response.post;  //XHR.responseでレスポンスされてきたJSONにアクセスできる
        if (item.checked === true) {  //もしも既読であれば
          post.setAttribute("data-check", "true");  //data-checkの属性値にtrueをセット
        } else if (item.checked === false) {  //もしも未読なら
          post.removeAttribute("data-check");  //data-checkは属性ごと削除
        }
      };
    });
  });
}
//window.addEventListener("load", check);
setInterval(check, 1000);
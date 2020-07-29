$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message__field__box" data-message-id=${message.id}>
          <div class="message__field__box__info">
            <div class="message__field__box__info__user__name">
              ${message.user_name}
            </div>
            <div class="message__field__box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message__field__box" data-message-id=${message.id}>
        <div class="message__field__box__info">
          <div class="message__field__box__info__user__name">
            ${message.user_name}
          </div>
          <div class="message__field__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.message__field__box:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.message__field').append(insertHTML);
        $('.message__field').animate({ scrollTop: $('.message__field')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
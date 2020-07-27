$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message__field__box">
          <div class="message__field__box__info">
            <div class="message__field__box__info__user__name">
              ${message.user_name}
            </div>
            <div class="message__field__box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message__field__box">
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

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message__field').append(html);
      $('.message__field').animate({ scrollTop: $('.message__field')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.Form-submit').prop("disabled", false);
    });
  });
});
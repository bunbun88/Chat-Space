$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image.url ? `<img src=${message.image.url}>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${ message.user_name }
                    </div>
                    <div class="message__upper-info__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="message__text">
                    <div class="lower-message__content">
                      ${ message.content }
                    </div>
                      ${ img }
                  </div>
                </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      scroll();
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  });
  
  
  var reloadMessages = function() {
    if (location.pathname.match(/groups\/\d+\/messages/)) {
    last_message_id = $('.message:last').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
      var insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      scroll();
    });
    })
    .fail(function() {
      console.log('自動更新に失敗しました');
    });
    }
  }
  setInterval(reloadMessages, 5000);
});

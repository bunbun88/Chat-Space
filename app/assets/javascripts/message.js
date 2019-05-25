$(document).on('turbolinks:load', function(){
  $(function() {
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message">
                    <div class="message__upper-info">
                      <p class="message__upper-info__talker">${message.name}</p>
                      <p class="message__upper-info__date">${message.date}</p>
                    </div>
                    <p class="message__text">${content}</p>
                    <p class="message__text">${img}</p>
                  </div>`
      return html;
    }
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        type: "POST",
        url: url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data)
        $('.messages').append(html)
        $('.content').val('')
        scrollBottom();
      })
      .fail(function(){
        alert('error');
      })
      .always(function() {
        $('.form__submit').prop('disabled', false);
      })
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    }); 
  });
});

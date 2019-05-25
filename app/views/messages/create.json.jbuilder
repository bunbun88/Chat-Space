json.name @message.user.name
json.date    @message.created_at.strftime("%Y/%m/%d %H:%M(#{%w(日 月 火 水 木 金 土)[Time.now.wday]})")
json.content @message.content 
json.image   @message.image.url

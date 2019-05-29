json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M(#{%w(日 月 火 水 木 金 土)[Time.now.wday]})")
json.user_name @message.user.name
json.id @message.id
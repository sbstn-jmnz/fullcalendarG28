json.extract! event, :id, :title, :start
json.url event_url(event, format: :json)
json.set! :editable, event.editable?
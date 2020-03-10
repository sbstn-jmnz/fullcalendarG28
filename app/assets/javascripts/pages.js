$(document).on('ready turbolinks:load', function(){
  
  var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );
  
  $.ajaxSetup( {
    beforeSend: function ( xhr ) {
      xhr.setRequestHeader( 'X-CSRF-Token', token );
    }
  });

  $('#calendar').fullCalendar({
    events: '/events.json',
    header: {
      center: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'Agregar evento...',
        click: function() {
          $.ajax({
            url: '/events/new',
            type: 'GET',
            dataType: 'script'
          })
        }
      }
    },
    eventDrop: function(event, delta, revertFunc) {
      if (event.start.format() < moment().format()){
        alert('No no nooo')
        revertFunc(); 
      } else {
        $.ajax({
                url: '/events/' + event.id,
                type: 'PATCH',
                dataType: 'JSON',
                data: { event: { start: event.start.format() } }
              })
      }
    },
    eventClick: function(event, jsEvent, view) {
      jsEvent.preventDefault()
      $.ajax({
              url: '/events/' + event.id + '/edit',
              type: 'GET',
              dataType: 'script'
            })
    }
  })
})

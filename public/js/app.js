var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var momentTimeStamp = moment.utc(message.timestamp);

	console.log('New message:');
	console.log(message.text);

	jQuery('.messages').prepend('<p><strong>' + momentTimeStamp.local().format('h:mma') + '</strong>: ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		timestamp: moment().format('X')
	});

	$message.val('');
});
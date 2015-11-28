var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Lobby';

socket.on('connect', function(){
	var momentTimeStamp = moment.utc();

	console.log('Connected to socket.io server!');
	jQuery('.messages').prepend('<p><strong>' + 
		momentTimeStamp.local().format('h:mma') + 
		'</strong>: ' + name + ' joined the room ' + 
		room + '</p>');

});

socket.on('message', function(message){
	var momentTimeStamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	console.log('New message:');
	console.log(message.text);

	$message.prepend('<p>' + message.text + '</p>');
	
	$message.prepend('<p><strong>' + 
		message.name + ' ' + 
		momentTimeStamp.local().format('h:mma') + 
		'</strong></p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});
var app = require('http').createServer(function(req, res) {
  res.writeHead(200);
  res.end();
});
var io = require('socket.io')(app);


var inputPort = process.env.PORT || process.argv[2];
app.listen(inputPort || 8080);
console.log('Listening on port '+(inputPort || 8080))


var map = [
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0]
];

var players = [];

io.on('connection', function(socket){

	console.log('New player: '+socket.id);

	var player = new Player(socket.id);
	players.push(player);
	socket.emit('players', players);

	socket.on('getMap', function(){
		socket.emit('map', map);
	});

	socket.on('getPlayers', function(){
		socket.emit('players', players);
	});

	socket.on('setName', function(name){
		player.setName(name);
	});

	socket.on('moveUp', function(){
		player.moveUp();
	});

	socket.on('moveDown', function(){
		player.moveDown();
	});

	socket.on('moveLeft', function(){
		player.moveLeft();
	});

	socket.on('moveRight', function(){
		player.moveRight();
	});

	socket.on('disconnect', function() {
		players.splice(players.findIndex(function(element){
			return element.id == socket.id;
		}), 1);
	});

});


var Player = function(id){
	this.id = id;
	this.x = 5;
	this.y = 10;
	this.name = 'anonymous';
}

Player.prototype.setName = function(name){
	this.name = name;
};

Player.prototype.moveUp = function(){
	if(this.y > 0)
		this.y--;
};

Player.prototype.moveDown = function(){
	if(this.y < map.length - 1)
		this.y++;
};

Player.prototype.moveLeft = function(){
	if(this.x > 0)
		this.x--;
};

Player.prototype.moveRight = function(){
	if(this.x < map[0].length - 1)
		this.x++;
};

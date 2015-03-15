
module.exports = function (io) {
	var all = {};
	var socks = {};
	io.on('connection', function (socket) {
		socket.on('reg', function (data) {
			socket.name = data.name;
			socket.broadcast.emit('new', {name: socket.name});
			all[socket.name] = false;
			socks[socket.name] = socket;
			socket.emit('others', all);
		});

		socket.on('disconnect', function () {
			io.sockets.emit('del', {name: socket.name});
			delete all[socket.name];
			delete socks[socket.name];
		});

		socket.on('on', function () {
			all[socket.name] = true;
			socket.broadcast.emit('on', {name: socket.name})
		})

		socket.on('off', function () {
			all[socket.name] = true;
			socket.broadcast.emit('off', {name: socket.name})
		})

		socket.on('vib', function (data) {
			if (socks[data.name]) {
				socks[data.name].emit('vib');
			}
		})

	});

}

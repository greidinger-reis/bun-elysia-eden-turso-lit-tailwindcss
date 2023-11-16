import fs from "fs"

//Source: https://github.com/ethanniser/the-beth-stack/
export function liveReloadScript({
	debounceTime = 100,
	url = 'ws://localhost:3001/ws',
}: {
	url?: string
	debounceTime?: number
} = {}): string {
	return `let reloadTimeout;
(function () {
let socket = new WebSocket(\"${url}\");

socket.onopen = function(e) {
	console.log("connected")
};


socket.onmessage = function(event) {
	console.log("event", event.data)
	// Clear any existing reload timeout
	clearTimeout(reloadTimeout);

	// Set a new reload timeout
	reloadTimeout = setTimeout(() => {
	location.reload();
	}, ${debounceTime});  // 50ms debounce time
};

socket.onclose = function(event) {
	console.log("closed");
};

socket.onerror = function(error) {
	console.log("error: " + error.message);
};
})();`
}

if(!fs.existsSync('public')) fs.mkdirSync('public')
const file = Bun.file('public/live-reload.js')
await Bun.write(file, liveReloadScript()).then(()=> console.log(`🦊 Live reload script file written successfully.`))

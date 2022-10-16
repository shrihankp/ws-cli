# ws-cli

A tool that allows you to instantly create a WebSocket server that clients can connect to and send and receive messages to and from those clients. This can be useful for testing applications that consume such servers by starting a mock server and sending required messages.

## Why did I create this?

For testing [reisxd/termux-app](https://github.com/reisxd/termux-app).

## How to get it?

- Clone the repository (or alternatively, use):

```bash
git clone https://github.com/shrihanDev/ws-cli
```

- Open a terminal in that directory (`cd` into it):

```bash
cd ws-cli
```

- Install dependencies:

```bash
yarn install --production # (or `npm install` if you don't have `yarn`)
```

- Run it:

```bash
node .
```

## I've installed it, now what?

```bash
[shrihan@archbtw:~/work/ws-cli] $ node .
 █████   ███   █████  █████████               █████████  █████       █████
░░███   ░███  ░░███  ███░░░░░███             ███░░░░░███░░███       ░░███
 ░███   ░███   ░███ ░███    ░░░             ███     ░░░  ░███        ░███
 ░███   ░███   ░███ ░░█████████  ██████████░███          ░███        ░███
 ░░███  █████  ███   ░░░░░░░░███░░░░░░░░░░ ░███          ░███        ░███
  ░░░█████░█████░    ███    ░███           ░░███     ███ ░███      █ ░███
    ░░███ ░░███     ░░█████████             ░░█████████  ███████████ █████
     ░░░   ░░░       ░░░░░░░░░               ░░░░░░░░░  ░░░░░░░░░░░ ░░░░░

ws-cli $ help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    start [port]       Starts a WebSocket server at `port` (defaults to 8080)
    stop               Stops the WebSocket server if its running.
    send [message]     Sends a message to the connected clients
    clear              Clears the screen
    address            Get the address of the running server in JSON (as returned by
                       WebSocketServer.address())

ws-cli $
```

## LICENSE

See LICENSE.txt.

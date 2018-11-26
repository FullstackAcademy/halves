# Halves

### A fun socket-based game for lecture demos

In this game, audience members are prompted via TCP to answer questions. As they do, a web view displays in real time how many users have responded. For the punchline, the instructor reveals that the audience was asked two different questions, and shows the associations between questions and replies.

## Setup

Install and run the servers:

```sh
npm i
npm start # TCP server starts on 8124 # HTTP server starts on 1237
```

In a separate tab, create a port using [ngrok](http://ngrok.io)

```sh
ngrok tcp 8124 # starts a tunnel
```

Ngrok will report it has opened a forwarding address, e.g.:

```
Forwarding tcp://0.tcp.ngrok.io:16437 -> localhost:8124
```

## Game Admin

Open the game in your own web browser and display it to your audience.

```sh
open http://localhost:1237
```

Send (e.g. via Slack) your audience the following command (which uses [netcat](https://en.wikipedia.org/wiki/Netcat)). The domain and port are listed in the forwarding address (see previous section, and note there is no colon):

```sh
nc 0.tcp.ngrok.io 16437
```

Instruct your audience to run the command in their shell. They will see a welcome:

```sh
Welcome to the game!
Awaiting next question . . .
```

In the game web view, click "Start New Questions." The audience will be shown a prompt, e.g.:

```sh
What might you name your first child?
```

The audience members should type in their reply and hit return. The web view will be updated to reflect how many users have responded. When you are ready, click "Reveal Question" twice in the web view.

*Surprise!* The audience was actually asked two different questions:

- What might you name your first child?
- What is the name of your pet (or your favorite pet name)?

Click "Reveal Response Associations" to show which replies were for each question. Rinse & repeat.

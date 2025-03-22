from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json

app = FastAPI()

connections = {}

@app.websocket('/ws')
async def connect_clients(websocket: WebSocket):
    await websocket.accept()
  
    try:
        # Receive the first message to get the username
        data = await websocket.receive_text()
        data_obj = json.loads(data)
        username = data_obj.get("name")

        if username:
            user_id = id(websocket)  # Unique identifier for the connection
            connections[user_id] = {"username": username, "ws": websocket}
            await broadcast_users()
        
        # Listen for messages
        while True:
            data = await websocket.receive_text()
            data_obj = json.loads(data)

            if data_obj.get("type") == "message":
                message = data_obj.get("message")
                sender = username  # Use stored username

                if message:
                    await send_message(sender, message)

    except WebSocketDisconnect:
        user_id = id(websocket)
        if user_id in connections:
            del connections[user_id]
            await broadcast_users()

async def broadcast_users():
    """Notify all clients about the updated user list."""
    all_users = [info["username"] for info in connections.values()]
    for client in connections.values():
        await client["ws"].send_json({"type": "users", "users": all_users})

async def send_message(sender, message):
    """Broadcast message to all connected clients."""
    for client in connections.values():
        await client["ws"].send_json({"type": "message", "message": message, "sender": sender})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True)

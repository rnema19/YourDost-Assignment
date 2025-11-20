# To-Do REST API

A simple REST API for managing to-do items with in-memory storage and JSON file persistence.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Input validation
- ✅ Persistent storage (JSON file backup)
- ✅ Proper HTTP status codes
- ✅ `completed` status tracking
- ✅ Timestamps (createdAt, updatedAt)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
node app.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Get All Todos
**GET** `/todos`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "task": "Buy groceries",
      "description": "Milk, bread, eggs",
      "completed": false,
      "createdAt": "2025-11-20T10:30:00.000Z"
    }
  ]
}
```

### 2. Create a Todo
**POST** `/todos`

**Request Body:**
```json
{
  "task": "Buy groceries",
  "description": "Milk, bread, eggs",
  "completed": false
}
```

**Required Fields:**
- `task` (string) - Cannot be empty
- `description` (string) - Cannot be empty

**Optional Fields:**
- `completed` (boolean) - Defaults to `false`

**Response (201):**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "task": "Buy groceries",
    "description": "Milk, bread, eggs",
    "completed": false,
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

### 3. Update a Todo
**PUT** `/todos/:id`

**Request Body (all fields optional):**
```json
{
  "task": "Buy groceries and snacks",
  "description": "Updated description",
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "task": "Buy groceries and snacks",
    "description": "Updated description",
    "completed": true,
    "createdAt": "2025-11-20T10:30:00.000Z",
    "updatedAt": "2025-11-20T11:00:00.000Z"
  }
}
```

### 4. Delete a Todo
**DELETE** `/todos/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "id": 1,
    "task": "Buy groceries",
    "description": "Milk, bread, eggs",
    "completed": false,
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

## Testing with cURL

### Create a todo:
```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d "{\"task\":\"Buy groceries\",\"description\":\"Milk, bread, eggs\",\"completed\":false}"
```

### Get all todos:
```bash
curl http://localhost:3000/todos
```

### Update a todo:
```bash
curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d "{\"completed\":true}"
```

### Delete a todo:
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## Testing with PowerShell

### Create a todo:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/todos -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"task":"Buy groceries","description":"Milk, bread, eggs","completed":false}'
```

### Get all todos:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/todos -Method GET
```

### Update a todo:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/todos/1 -Method PUT -Headers @{"Content-Type"="application/json"} -Body '{"completed":true}'
```

### Delete a todo:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/todos/1 -Method DELETE
```

## Testing with Postman or Thunder Client

1. **GET** `http://localhost:3000/todos`
2. **POST** `http://localhost:3000/todos` with JSON body
3. **PUT** `http://localhost:3000/todos/1` with JSON body
4. **DELETE** `http://localhost:3000/todos/1`

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Task is required and cannot be empty"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Todo not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to create todo"
}
```

## Data Persistence

- Todos are stored in memory and automatically saved to `data/todos.json`
- Data persists across server restarts
- The JSON file is created automatically on first write

## Project Structure

```
backend/
├── app.js              # Express app setup and server
├── data/
│   ├── data.js        # Data management logic
│   └── todos.json     # Persistent storage (auto-generated)
├── model/
│   └── todoSchema.js  # Mongoose schema (optional)
├── routes/
│   └── todoRoutes.js  # API route handlers
└── package.json       # Dependencies
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM (installed but not required for this implementation)

## License

MIT

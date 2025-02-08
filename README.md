# 📝 Redux Toolkit Todo App with JSON Server  

A simple **To-Do App** built using **React, Redux Toolkit, Axios**, and a **JSON Server** for persistent data storage. This app allows users to **add, update, delete, and fetch** tasks from a local JSON file.  

## 🚀 Features  
✅ Add new tasks  
✅ Update existing tasks  
✅ Delete tasks  
✅ Fetch tasks from JSON Server  
✅ State management with Redux Toolkit  
✅ Data persistence with JSON Server  
✅ API calls using Axios  

---

## 🛠️ Required Packages  

Install the necessary dependencies before running the app:  

```sh
npm install
@reduxjs/toolkit react-redux
axios
json-server
```


## ⚙️ JSON Server Setup

1️⃣ Create a db.json file in the project root with the following structure:

```sh
{
  "todos": [
    { "id": 1, "title": "Learn Redux", "completed": false },
    { "id": 2, "title": "Build a Todo App", "completed": true }
  ]
}
```
2️⃣ Add the following script in package.json:
```sh
"scripts": {
  "server": "json-server --watch db.json --port 5000"
}
```
3️⃣ Start the JSON Server:





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
const API_URL = 'http://localhost:3030/todo'

export const addTodo = createAsyncThunk(
    'todo/addTodo',
    async(newTodo)=>{
        const response = await axios.post(API_URL,newTodo);
        // console.log(response);
        return response.data;
    }
)
export const fetchTodo = createAsyncThunk(
    'todo/fetchTodo',
    async()=>{
        const response = await axios.get(API_URL);
        return response.data;
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async(id)=>{
        const response = await axios.delete(`http://localhost:3030/todo/${id}`);
        return id;
    }
)

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async(data)=>{
        const response = await axios.put(`http://localhost:3030/todo/${data.id}`, data)
        return response.data    
    }
)

const initialState ={
    data : [],
    is_loading:false,
    error:null
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{

    },
    extraReducers:(builder )=>{
        builder
        // to add todo
        .addCase(addTodo.pending,(state,action)=>{
            state.is_loading = true
            state.error = false
        })
        .addCase(addTodo.fulfilled, (state,action)=>{
             state.data.push(action.payload)
             state.is_loading = false
             state.error = null 
        })        
        .addCase(addTodo.rejected,(state,action)=>{
            state.is_loading = false
            state.error = state.error
        })
        // to fetch todo
        .addCase(fetchTodo.pending,(state,action)=>{
            state.is_loading = true
            state.error = false
        }) 
        .addCase(fetchTodo.fulfilled,(state,action)=>{
            state.data = action.payload
            state.is_loading = false
            
        })
        .addCase(fetchTodo.rejected,(state,action)=>{
            state.is_loading = false
            state.error = state.error
        })

        // to delete todo
        .addCase(deleteTodo.fulfilled, (state,action)=>{
            state.data = state.data.filter((todo)=> todo.id !== action.payload)
            state.is_loading = false
        })

        //  to update todo
        .addCase(updateTodo.pending, (state) => {
            state.is_loading = true;
            state.error = null;
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.data = state.data.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
            state.is_loading = false;
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.is_loading = false;
            state.error = action.error.message; 
        });

    }
})

export default todoSlice.reducer
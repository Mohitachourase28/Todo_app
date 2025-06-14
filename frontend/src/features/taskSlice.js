import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "axios";

// Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/tasks");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Failed to fetch tasks"
    );
  }
});

// Create a new task
export const createTask = createAsyncThunk("tasks/createTask", async (taskData, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/tasks", taskData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Failed to create task"
    );
  }
});

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to update task"
      );
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Failed to delete task"
    );
  }
});

// Update task order (drag & drop)
export const updateTaskOrder = createAsyncThunk("tasks/updateTaskOrder", async (taskIds, thunkAPI) => {
  try {
    const res = await axiosInstance.put("/tasks/reorder", { taskIds });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Failed to update task order"
    );
  }
});

// Update task status (e.g. mark as Completed)
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(`/tasks/${id}`, { status });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Status update failed"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // updateTaskStatus
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })

      // Reorder tasks
      .addCase(updateTaskOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskOrder.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTaskOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;

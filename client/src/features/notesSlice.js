import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/api";
import { setUser } from "./authSlice";

// Async thunks for API calls
export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            // This calls GET / which is noteController.displayUser
            // JWT token in Authorization header provides the userId
            const response = await api.get('/');
            if(response.data.user){
                dispatch(setUser(response.data.user));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes');
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (noteData, { rejectWithValue }) => {
        try {
            // This calls POST / which is noteController.addNote
            // JWT token provides userId, no need to include in URL
            const response = await api.post('/', noteData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create note');
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ noteId, noteData }, { rejectWithValue }) => {
        try {
            // This calls POST /:noteId which is noteController.editNote
            const response = await api.post(`/${noteId}`, noteData);
            return { noteId, noteData: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update note');
        }
    }
);

export const fetchNoteById = createAsyncThunk(
    'notes/fetchNoteById',
    async (noteId, { rejectWithValue }) => {
        try {
            // This calls GET /:noteId which is noteController.viewNote
            const response = await api.get(`/${noteId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch note');
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId, { rejectWithValue }) => {
        try {
            // This calls POST /:noteId/delete which is noteController.remNote
            await api.post(`/${noteId}/delete`);
            return noteId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete note');
        }
    }
);

const initialState = {
    notes: [],
    selectedNote: null,
    loading: false,
    error: null
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setSelectedNote: (state, action) => {
            state.selectedNote = action.payload;
        },
        clearSelectedNote: (state) => {
            state.selectedNote = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch notes
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload.notes || [];
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create note
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                console.log("note created");
                state.loading = false;
                // Refresh notes after creating
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update note
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                // Refresh notes after updating
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch note by ID
            .addCase(fetchNoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoteById.fulfilled, (state, action) => {
                state.loading = false;
                // Extract the note from the response (backend returns { user, notes, formTitle, formContent, ... })
                // We need to find the note that matches the form data
                const noteData = {
                    _id: action.meta.arg, // The noteId we requested
                    noteTitle: action.payload.formTitle,
                    noteContent: action.payload.formContent
                };
                state.selectedNote = noteData;
            })
            .addCase(fetchNoteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete note
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note._id !== action.payload);
                if (state.selectedNote?._id === action.payload) {
                    state.selectedNote = null;
                }
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setSelectedNote, clearSelectedNote, clearError } = notesSlice.actions;
export default notesSlice.reducer;

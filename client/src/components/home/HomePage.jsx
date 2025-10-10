import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import NoteForm from './NoteForm';
import { fetchNotes, fetchNoteById, createNote, updateNote, deleteNote, setSelectedNote, clearSelectedNote } from '../../features/notesSlice';
import './home.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { notes, selectedNote, loading, error } = useSelector(state => state.notes);
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // No need to pass userId - it's extracted from JWT token in backend
        dispatch(fetchNotes());
    }, [dispatch]);

    const handleCreateNote = async (noteData) => {
        try {
            await dispatch(createNote(noteData)).unwrap();
            // Refetch notes to get the updated list
            dispatch(fetchNotes());
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to create note:', error);
        }
    };

    const handleUpdateNote = async (noteId, noteData) => {
        try {
            await dispatch(updateNote({ noteId, noteData })).unwrap();
            // Refetch notes to get the updated list
            dispatch(fetchNotes());
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await dispatch(deleteNote(noteId)).unwrap();
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleSelectNote = async (note) => {
        try {
            // Fetch the full note content from the backend
            await dispatch(fetchNoteById(note._id)).unwrap();
            setIsEditing(true);
        } catch (error) {
            console.error('Failed to fetch note:', error);
        }
    };

    const handleNewNote = () => {
        dispatch(clearSelectedNote());
        setIsEditing(false);
    };

    if(!user){
        try{
            navigate('/login');
        }
        catch(e){
            console.log("Please login..");
        }
    }

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="App">
            <Sidebar 
                user={user}
                notes={notes}
                onSelectNote={handleSelectNote}
                onNewNote={handleNewNote}
                onDeleteNote={handleDeleteNote}
            />
            <NoteForm
                selectedNote={selectedNote}
                isEditing={isEditing}
                onCreateNote={handleCreateNote}
                onUpdateNote={handleUpdateNote}
            />
        </div>
    );
};

export default HomePage;

import React from 'react';

const NoteItem = ({ note, onSelect, onDelete }) => {
    const handleNoteClick = () => {
        onSelect(note);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent note selection when deleting
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note._id);
        }
    };

    return (
        <div className="noteContainer">
            <button 
                className="notes" 
                onClick={handleNoteClick}
                style={{ textDecoration: 'none', width: '100%' }}
            >
                {note.noteTitle}
            </button>
            <button 
                className="delete" 
                onClick={handleDeleteClick}
                type="button"
                title="Delete note"
            >
                <i className="material-icons">delete</i>
            </button>
        </div>
    );
};

export default NoteItem;

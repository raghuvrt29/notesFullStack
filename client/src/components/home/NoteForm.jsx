import React, { useState, useEffect } from 'react';

const NoteForm = ({ selectedNote, isEditing, onCreateNote, onUpdateNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (isEditing && selectedNote) {
            setTitle(selectedNote.noteTitle || '');
            setContent(selectedNote.noteContent || '');
        } else {
            setTitle('');
            setContent('');
        }
    }, [selectedNote, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        const noteData = {
            title: title.trim(),
            content: content.trim()
        };

        if (isEditing && selectedNote) {
            onUpdateNote(selectedNote._id, noteData);
        } else {
            onCreateNote(noteData);
        }
    };

    const buttonText = isEditing ? 'Edit Note' : 'Add Note';

    return (
        <div className="main">
            <form className="form-inputs" onSubmit={handleSubmit}>
                <input
                    className="noteTitle"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="noteContent"
                    id="content"
                    name="content"
                    placeholder="Note content...."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    className="submit"
                    type="submit"
                    value={buttonText}
                />
            </form>
        </div>
    );
};

export default NoteForm;

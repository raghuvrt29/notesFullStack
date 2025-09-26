import React from 'react';
import NoteItem from './NoteItem';

const Sidebar = ({ user, notes, onSelectNote, onNewNote, onDeleteNote }) => {
    const handleProfileClick = () => {
        // Navigate to profile page - will implement when adding routing
        console.log('Navigate to profile');
    };

    return (
        <div className="sideBar">
            <h1>
                <a href="#" onClick={handleProfileClick} style={{ textDecoration: 'none' }}>
                    {user?.name || user?.username || 'User'}
                </a>
            </h1>
            <button className="newNote" onClick={onNewNote}>
                + New Note
            </button>
            <div className="notes-list">
                {notes?.map((note) => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        onSelect={onSelectNote}
                        onDelete={onDeleteNote}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

import { getAuthHeaders } from './auth.js';

// Function to delete a note
export async function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Note deleted successfully!');
        // Reload the page to refresh the notes list
        window.location.reload();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
    }
}

// Function to edit a note
export function editNote(noteId) {
    window.location.href = `forumpagenote.html?edit=${noteId}`;
}

// Function to load notes
export async function loadNotes() {
    try {
        const response = await fetch('http://localhost:5000/api/notes', {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notes = await response.json();
        return notes;
    } catch (error) {
        console.error('Error loading notes:', error);
        alert('Failed to load notes. Please try again.');
        return [];
    }
}

export function getNoteDateCategory(note) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const noteDate = new Date(note.alarmDate);
    noteDate.setHours(0, 0, 0, 0);
    
    if (noteDate.getTime() === today.getTime()) {
        return 'today';
    } else if (noteDate.getTime() === tomorrow.getTime()) {
        return 'tomorrow';
    } else if (noteDate <= nextWeek) {
        return 'this-week';
    } else {
        return 'later';
    }
} 
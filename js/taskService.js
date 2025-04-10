import { getAuthHeaders } from './auth.js';

// Function to delete a task
export async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Task deleted successfully!');
        // Reload the page to refresh the tasks list
        window.location.reload();
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}

// Function to edit a task
export function editTask(taskId) {
    window.location.href = `forumpagetodo.html?edit=${taskId}`;
}

// Function to load tasks
export async function loadTasks() {
    try {
        const response = await fetch('http://localhost:5000/api/tasks', {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Failed to load tasks. Please try again.');
        return [];
    }
}

export function getTaskDateCategory(task) {
    if (task.completed) {
        return 'completed';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    // Debug log to check dates
    console.log('Task:', task.title, 'Due Date:', taskDate, 'Today:', today);
    
    if (taskDate.getTime() === today.getTime()) {
        return 'today';
    } else if (taskDate.getTime() === tomorrow.getTime()) {
        return 'tomorrow';
    } else if (taskDate > today && taskDate <= nextWeek) {
        return 'this-week';
    } else if (taskDate > nextWeek) {
        return 'later';
    } else {
        // If the task is overdue (before today), show it in today's section
        return 'today';
    }
} 
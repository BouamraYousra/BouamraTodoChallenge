import { useState } from "react";

import { config } from "../../config";

export function useAddTodo() {
    const [loading, setLoading] = useState(false);
    async function addTodo(content) {
        let data = null;
        setLoading(true);
        try {
            const response = await fetch(`${config.apiEndpoint}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            data = await response.json();
            
            // Reset taskContent state after successful submission
            // setTaskContent('');

            // Close the dialog
            // handleClose();
        } catch (error) {
            console.error('Error adding task:', error);
        } finally {
            setLoading(false);
        }
        
        return data;
    }

    return {
        addTodo,
        loading
    }
}

export function useFetchTodos() {
    const [loading, setLoading] = useState(false);
    async function fetchTodos() {
        setLoading(true);
        let data = null;
        try {
            const response = await fetch(`${config.apiEndpoint}/todo`);
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            data = await response.json();
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }

        return data;
    }

    return {
        fetchTodos,
        loading
    }
}

export function useDeleteTodo() {
    const [loading, setLoading] = useState(false);
    async function deleteTodo(id) {
        setLoading(true);
        let data = null;
        try {
            const response = await fetch(`${config.apiEndpoint}/todo/${id}`, { method: 'DELETE'});
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            data = await response.json();
            console.log(data)
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }

        return data;
    }

    return {
        deleteTodo,
        loading
    }
}


export function useUpdateTodoStatus() {
    const [loading, setLoading] = useState(false);

    async function updateTodoStatus(todoId, currentStatus, content) {
        let data = null;
        console.log('Content:hi', todoId);

        setLoading(true);
        try {
            // Determine the new status based on the current status
            const newStatus = currentStatus === 1 ? 0 : 1;
            const response = await fetch(`${config.apiEndpoint}/todostatus/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, status: newStatus }),
            });
            console.log(JSON.stringify({ content, status: newStatus }))
            if (!response.ok) {
                throw new Error('Failed to update task status');
            }

            data = await response.json();
            console.log('Updated todo data:', data);
        } catch (error) {
            console.error('Error updating task status:', error);
        } finally {
            setLoading(false);
            console.log('Loading state:', loading);
        }
        
        return data;
    }

    return {
        updateTodoStatus,
        loading
    }
}

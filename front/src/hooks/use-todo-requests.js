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

    async function updateTodoStatus(updated) {
        let data = null;
        console.log('Content:', updated);
        const { content, newStatus, todoId } = JSON.parse(updated);
        const statusup = newStatus === 0 ? 1 : 0;

        setLoading(true);
        console.log('Loading state:', loading);
        try {
            // Determine the new status based on the current status
            const response = await fetch(`${config.apiEndpoint}/todostatus/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content,status:statusup }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update task status for ID: ${todoId}, Content: ${content}, New Status: ${statusup},JSON.stringify({ status:newStatus })`);
    

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

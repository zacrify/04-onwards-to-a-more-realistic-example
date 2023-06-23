import React, { useState } from 'react';

const useFetch = async (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    if (props.method === 'POST') {
        const methodType =   {
            method: 'POST',
            body: JSON.stringify({ text: taskText }),
            headers: {
              'Content-Type': 'application/json',
            }
        }
    } else {
        const methodType = null;
    }

    try {
        const response = await fetch(
          'https://react-http-277cc-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
        ,methodType);
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        
        if(props.method === 'POST') {
            const generatedId = data.name; 
            const createdTask = { id: generatedId, text: taskText };
      
            props.onAddTask(createdTask);
        
        } else {
            const loadedTasks = [];
  
            for (const taskKey in data) {
              loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }
      
            setTasks(loadedTasks);
        }

      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    

    return (
        {isLoading, error, tasks}
    );
};


export default useFetch;
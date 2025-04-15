import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface LearningResource {
  id: number;
  title: string;
  description: string;
  url: string; // Using placeholder URLs
}

const WellnessApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [currentView, setCurrentView] = useState<'todo' | 'learning'>('todo');

  const learningResources: LearningResource[] = [
    { id: 1, title: 'Guided Meditation for Stress Relief', description: 'A 10-minute guided meditation to calm your mind.', url: '#' },
    { id: 2, title: 'Deep Breathing Exercise', description: 'Learn a simple technique to reduce anxiety quickly.', url: '#' },
    { id: 3, title: 'Mindfulness Practice for Focus', description: 'Improve concentration with this short mindfulness exercise.', url: '#' },
    { id: 4, title: 'Beginner Yoga for Mental Clarity', description: 'Gentle yoga poses to help clear your thoughts.', url: '#' },
    { id: 5, title: 'Progressive Muscle Relaxation', description: 'Release physical tension with this guided technique.', url: '#' },
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-teal-800 mb-6">
          My Wellness Hub
        </h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-teal-200 mb-6">
          <button
            onClick={() => setCurrentView('todo')}
            className={`px-4 py-2 text-lg font-medium rounded-t-lg focus:outline-none ${
              currentView === 'todo'
                ? 'border-b-2 border-teal-600 text-teal-700'
                : 'text-gray-500 hover:text-teal-600'
            }`}
          >
            To-Do List
          </button>
          <button
            onClick={() => setCurrentView('learning')}
            className={`px-4 py-2 text-lg font-medium rounded-t-lg focus:outline-none ml-4 ${
              currentView === 'learning'
                ? 'border-b-2 border-teal-600 text-teal-700'
                : 'text-gray-500 hover:text-teal-600'
            }`}
          >
            Cognitive Exercises
          </button>
        </div>

        {/* Content Area */}
        <div>
          {currentView === 'todo' && (
            <div>
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Daily Tasks</h2>
              <form onSubmit={addTask} className="flex mb-4">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={handleInputChange}
                  placeholder="Add a new task..."
                  className="flex-grow p-2 border border-teal-300 rounded-l-md focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Add
                </button>
              </form>
              <ul className="space-y-3">
                {tasks.length === 0 && (
                   <p className="text-gray-500 text-center italic">No tasks yet. Add one above!</p>
                )}
                {tasks.map(task => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${
                      task.completed ? 'bg-teal-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center flex-grow mr-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mr-3 cursor-pointer"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentView === 'learning' && (
            <div>
              <h2 className="text-xl font-semibold text-teal-700 mb-4">Mental Wellness Resources</h2>
              <p className="text-gray-600 mb-6">Explore these exercises to support your cognitive wellbeing.</p>
              <ul className="space-y-4">
                {learningResources.map(resource => (
                  <li key={resource.id} className="bg-teal-50 p-4 rounded-lg border border-teal-200 hover:shadow-sm transition-shadow duration-200">
                    <h3 className="font-semibold text-teal-800 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    {/* In a real app, use proper anchor tags or routing */}
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 hover:text-teal-800 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500 rounded"
                    >
                      Watch Video / Learn More &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessApp;
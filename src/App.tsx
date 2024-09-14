import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NoteEditor from './components/NoteEditor';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="font-mono">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/note/:id" element={<NoteEditor />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, EditIcon } from 'lucide-react';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const saveNote = () => {
    if (currentNote.trim() !== '') {
      if (editingIndex === -1) {
        const updatedNotes = [...notes, currentNote.trim()];
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = currentNote.trim();
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setEditingIndex(-1);
      }
      setCurrentNote('');
    }
  };

  const selectNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Note Taking App</h1>
        </div>
        <div className="flex gap-4">
          <div className="w-2/3">
            <textarea
              className="h-64 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Write your note here..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            ></textarea>
            <button
              className="mt-2 rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
              onClick={saveNote}
            >
              Save
            </button>
          </div>
          <div className="w-1/3 overflow-y-auto">
            <h2 className="mb-2 text-lg font-medium">Notes</h2>
            {notes.map((note, index) => (
              <div
                key={index}
                className="mb-2 flex items-center justify-between rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                onClick={() => selectNote(index)}
              >
                <span>{note}</span>
                <div className="flex items-center gap-2">
                  <EditIcon
                    className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectNote(index);
                    }}
                  />
                  <TrashIcon
                    className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(index);
                    }}
                  />
                </div>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="flex items-center justify-center text-gray-400">
                No notes yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
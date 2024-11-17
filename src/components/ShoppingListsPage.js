import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingListsPage.css';

const ShoppingListsPage = () => {
  const [shoppingLists, setShoppingLists] = useState([
    { id: 1, title: 'Groceries', ownerId: 1 },
    { id: 2, title: 'Electronics', ownerId: 2 },
    { id: 3, title: 'Office Supplies', ownerId: 1 },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [listToDelete, setListToDelete] = useState(null);

  const userId = 1;

  const handleAddList = () => {
    if (!newListTitle.trim()) return;

    const newList = {
      id: Date.now(),
      title: newListTitle,
      ownerId: userId,
    };

    setShoppingLists([...shoppingLists, newList]);
    setNewListTitle('');
    setModalOpen(false);
  };

  const handleDeleteList = () => {
    if (!listToDelete) return;

    setShoppingLists(shoppingLists.filter((list) => list.id !== listToDelete.id));
    setListToDelete(null);
  };

  return (
    <div className="shopping-lists-page">
      <h1 className="title">My Shopping Lists</h1>

      {/* Add New Shopping List */}
      <button className="add-button" onClick={() => setModalOpen(true)}>
        + Add New List
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Shopping List</h2>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Enter list title"
              className="input"
            />
            <div className="modal-actions">
              <button onClick={handleAddList} className="confirm-button">Add</button>
              <button onClick={() => setModalOpen(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Lists */}
      <div className="shopping-lists-container">
        {shoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-card">
            <Link
              to={`/shopping-lists/${list.id}`}
              state={{ title: list.title }}
              className="shopping-list-title"
            >
              {list.title}
            </Link>
            {list.ownerId === userId && (
              <button
                className="delete-button"
                onClick={() => setListToDelete(list)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {listToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete the list "{listToDelete.title}"?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteList} className="confirm-button">
                Yes, Delete
              </button>
              <button onClick={() => setListToDelete(null)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListsPage;

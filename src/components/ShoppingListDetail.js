import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ShoppingListDetail.css';

const ShoppingListDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [shoppingList, setShoppingList] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newMember, setNewMember] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const fetchedList = {
        id,
        title: location.state?.title || `List #${id}`,
        ownerId: 1,
        members: [
          { id: 2, name: 'John' },
          { id: 3, name: 'Doe' },
        ],
        items: [
          { id: 1, name: 'Milk', purchased: false },
          { id: 2, name: 'Eggs', purchased: true },
        ],
      };

      setShoppingList(fetchedList);
      setNewTitle(fetchedList.title);
      const currentUserId = 1;
      setIsOwner(fetchedList.ownerId === currentUserId);
    };

    fetchShoppingList();
  }, [id, location.state]);

  const handleChangeTitle = () => {
    if (!isOwner) return;
    setShoppingList((prev) => ({ ...prev, title: newTitle }));
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setShoppingList((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: newItem, purchased: false }],
    }));
    setNewItem('');
  };

  const toggleItemPurchased = (itemId) => {
    setShoppingList((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, purchased: !item.purchased } : item
      ),
    }));
  };

  const handleDeleteItem = (itemId) => {
    setShoppingList((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const handleAddMember = () => {
    if (!newMember.trim() || !isOwner) return;
    setShoppingList((prev) => ({
      ...prev,
      members: [...prev.members, { id: Date.now(), name: newMember }],
    }));
    setNewMember('');
  };

  const handleRemoveMember = (memberId) => {
    if (!isOwner) return;
    setShoppingList((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
    }));
  };

  const handleLeaveList = (memberId) => {
    setShoppingList((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
    }));
  };

  if (!shoppingList) return <div>Loading...</div>;

  return (
    <div className="shopping-list-detail">
      <h1>{shoppingList.title}</h1>

      {isOwner && (
        <div className="edit-title">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit title"
          />
          <button onClick={handleChangeTitle} className="edit-button">
            Change Name
          </button>
        </div>
      )}

      <div className="items-section">
        <h2>Items</h2>
        <ul className="items-list">
          {shoppingList.items.map((item) => (
            <li key={item.id} className="item-row">
              <div className="item-content">
                <label>
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => toggleItemPurchased(item.id)}
                  />
                  <span className={item.purchased ? 'purchased' : ''}>
                    {item.name}
                  </span>
                </label>
              </div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="delete-button"
                title="Delete Item"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <div className="add-item">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button onClick={handleAddItem} className="add-button">
            Add Item
          </button>
        </div>
      </div>

      <div className="members-section">
        <h2>Members</h2>
        <ul className="members-list">
          {shoppingList.members.map((member) => (
            <li key={member.id}>
              {member.name}
              {isOwner ? (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="remove-button"
                >
                  Kick Out
                </button>
              ) : (
                <button
                  onClick={() => handleLeaveList(member.id)}
                  className="leave-button"
                >
                  Leave
                </button>
              )}
            </li>
          ))}
        </ul>
        {isOwner && (
          <div className="add-member">
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Add new member"
            />
            <button onClick={handleAddMember} className="add-button">
              Add Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListDetail;

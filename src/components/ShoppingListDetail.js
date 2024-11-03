import React, { useState } from 'react';
import '../App.css';

function ShoppingListDetail() {
  const [title, setTitle] = useState("List 1");
  const [items, setItems] = useState([
    { id: 1, name: "Položka 1", resolved: false },
    { id: 2, name: "Položka 2", resolved: false },
    { id: 3, name: "Položka 3", resolved: true },
  ]);
  const [newItemName, setNewItemName] = useState("");
  
 
  const [isOwner] = useState(false); // Stav pro kontrolu, zda je uživatel vlastníkem "false" nebo "true"
  
  const [members, setMembers] = useState(["Martin", "Dan", "Tomáš"]);
  const [currentUser] = useState("Martin"); // Předpokládáme, že aktuální uživatel je "Martin"

  const addItem = () => {
    if (newItemName.trim()) {
      setItems([...items, { id: items.length + 1, name: newItemName, resolved: false }]);
      setNewItemName("");
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, resolved: !item.resolved } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addMember = (name) => {
    if (name && !members.includes(name)) {
      setMembers([...members, name]);
    }
  };

  const removeMember = (name) => {
    setMembers(members.filter(member => member !== name));
  };

  const leaveList = () => {
    setMembers(members.filter(member => member !== currentUser));
  };

  return (
    <div className="container">
      <header>
        <h1>{title}</h1>
        {isOwner && (
          <button className="icon-button" onClick={() => setTitle(prompt("Zadejte nový název:", title))}>
            ✏️
          </button>
        )}
      </header>
      

      <div>
        <h2>Členové</h2>
        <ul>
          {members.map(member => (
            <li key={member}>
              {member} 
              {isOwner && (
                <button onClick={() => removeMember(member)}>Odebrat</button>
              )}
            </li>
          ))}
        </ul>
        {isOwner ? (
          <input
            type="text"
            placeholder="Přidat nového člena"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addMember(e.target.value);
                e.target.value = '';
              }
            }}
          />
        ) : (
          <button onClick={leaveList}>Odejít ze seznamu</button>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Jméno nové položky"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button className="add-button" onClick={addItem}>+</button>
      </div>

      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <span className={`item-name ${item.resolved ? "item-completed" : ""}`}>
              {item.name}
            </span>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.resolved}
              onChange={() => toggleItem(item.id)}
            />
            <button className="delete-button" onClick={() => removeItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListDetail;

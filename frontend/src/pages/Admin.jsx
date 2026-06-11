import React, { useState, useEffect } from 'react';
import './Admin.css';

export default function AdminPage() {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [editingUserId, setEditingUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/accounts', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      if (response.ok && Array.isArray(data)) {
        setAccounts(data);
      } else {
        console.error("Backend response failed or wasn't an array:", data);
        setAccounts([]);
      }
    } catch (err) {
      console.error("Network error connecting to backend:", err);
      setAccounts([]);
    }
  };

  async function updateName(userId) {
    if (!name.trim()) return;
    await fetch(`http://localhost:5000/account/${userId}/update-name`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ display_name: name })
    });
  }

  async function updateEmail(userId) {
    if (!email.trim()) return;
    await fetch(`http://localhost:5000/account/${userId}/update-email`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });
  }

  async function handleSubmit(userId) {
    await updateName(userId);
    await updateEmail(userId);

    setAccounts(accounts.map(acc => 
      acc._id === userId ? { ...acc, display_name: name, email: email } : acc
    ));

    window.alert('Account Details Updated!');
    setEditingUserId(null);
  }

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to permanently delete this account?")) {
      try {
        const response = await fetch(`http://localhost:5000/admin/accounts/${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          setAccounts(accounts.filter(acc => acc._id !== userId));
          alert("Account successfully deleted.");
        }
      } catch (err) {
        alert("Error connecting to server.");
      }
    }
  };

   async function logOut() {
        const response = await fetch(
        'http://localhost:5000/logout',
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        }
        );

        if (response.ok) {
            window.location.href = '/';
        }
    }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin</h1>
        <input 
          type="text" 
          placeholder="Search accounts by name or email" 
          className="admin-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="admin-grid">
        {Array.isArray(accounts) && accounts.length > 0 ? (
          accounts
            .filter(acc => 
              acc.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              acc.email?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(account => {
              const isEditing = editingUserId === account._id;

              return (
                <div className="gradient" id="admin-card" key={account._id}>
                  <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="admin-label-input">
                      <label className="admin-label">Name: </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        disabled={!isEditing}
                        value={isEditing ? name : (account.display_name || 'No Name Set')}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="admin-label-input">
                      <label className="admin-label">Email: </label>
                      <input 
                        type="email" 
                        className="admin-input" 
                        disabled={!isEditing}
                        value={isEditing ? email : account.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="admin-label-input">
                      <label className="admin-label">Role: </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        disabled 
                        value={account.role || 'user'} 
                      />
                    </div>

                    {isEditing ? (
                      <div className="admin-buttons">
                        <button type="button" id="admin-submit" onClick={() => handleSubmit(account._id)}>
                          Save Changes
                        </button>
                        <button type="button" className="admin-logout" onClick={() => setEditingUserId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="admin-buttons">
                        <button 
                          type="button" 
                          id="admin-submit" 
                          onClick={() => {
                            setEditingUserId(account._id);
                            setName(account.display_name || '');
                            setEmail(account.email || '');
                          }}
                        >
                          Edit Details
                        </button>
                        {account.role !== 'admin' ? (
                            <button type="button" className="admin-logout admin-delete-btn" onClick={() => handleDelete(account._id)}>
                                Delete Account
                            </button>
                            ) : (
                            <button type="button" className="admin-logout" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                Protected
                            </button>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              );
            })
        ) : (
          <p className="admin-empty-message">No matching accounts found.</p>
        )}
      </div>
       <button className='admin-logout' onClick={() => logOut()}>Logout</button>
    </div>
  );
}
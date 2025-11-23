import { useState } from 'react';
import './UserSearch.css';

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:3001/api/users/search?username=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data);
      } else {
        setError(data.error || 'Search failed');
        setSearchResults(null);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const injectionExamples = [
    { label: "Dump all users", value: "' OR '1'='1' --" },
    { label: "UNION attack (dump entire DB)", value: "' UNION SELECT * FROM users --" },
    { label: "Show specific user", value: "admin" },
  ];

  return (
    <div className="user-search-page">
      <div className="search-container">
        <h1>User Search</h1>
        <p className="vulnerability-warning">
          ⚠️ This search is vulnerable to SQL injection! It directly concatenates user input into the query.
        </p>

        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter username to search..."
            className="search-input"
          />
          <button 
            onClick={handleSearch} 
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="injection-examples">
          <h3>Try these SQL injection payloads:</h3>
          <div className="example-buttons">
            {injectionExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(example.value)}
                className="example-button"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {searchResults && (
          <div className="results-section">
            <div className="query-display">
              <h3>Executed Query:</h3>
              <code>{searchResults.query}</code>
            </div>

            <div className="results-display">
              <h3>Results:</h3>
              {searchResults.results && (
                <>
                  {/* Check if it's the UNION attack that returns the entire database */}
                  {searchResults.results.users ? (
                    <div className="full-database">
                      <h4>🚨 FULL DATABASE DUMP DETECTED! 🚨</h4>
                      
                      {/* Users Table */}
                      <div className="table-section">
                        <h5>Users Table ({searchResults.results.users.length} records)</h5>
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Username</th>
                              <th>Password (Cleartext!)</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.results.users.map(user => (
                              <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td className="password-cell">{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.created).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* API Keys Table */}
                      {searchResults.results.api_keys && (
                        <div className="table-section">
                          <h5>API Keys Table ({searchResults.results.api_keys.length} records)</h5>
                          <table className="data-table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Key</th>
                                <th>Owner</th>
                                <th>Permissions</th>
                                <th>Created</th>
                              </tr>
                            </thead>
                            <tbody>
                              {searchResults.results.api_keys.map(key => (
                                <tr key={key.id}>
                                  <td>{key.id}</td>
                                  <td className="api-key-cell">{key.key}</td>
                                  <td>{key.owner}</td>
                                  <td>{key.permissions.join(', ')}</td>
                                  <td>{new Date(key.created).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Sessions Table */}
                      {searchResults.results.sessions && (
                        <div className="table-section">
                          <h5>Sessions Table ({searchResults.results.sessions.length} records)</h5>
                          <table className="data-table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Token</th>
                                <th>Expires</th>
                              </tr>
                            </thead>
                            <tbody>
                              {searchResults.results.sessions.map(session => (
                                <tr key={session.id}>
                                  <td>{session.id}</td>
                                  <td>{session.user_id}</td>
                                  <td className="token-cell">{session.token.substring(0, 20)}...</td>
                                  <td>{new Date(session.expires).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ) : Array.isArray(searchResults.results) ? (
                    /* Regular user search results */
                    <div className="user-results">
                      {searchResults.results.length === 0 ? (
                        <p>No users found</p>
                      ) : (
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Username</th>
                              <th>Password</th>
                              <th>Email</th>
                              <th>Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.results.map(user => (
                              <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td className="password-cell">{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ) : (
                    <pre>{JSON.stringify(searchResults.results, null, 2)}</pre>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSearch;

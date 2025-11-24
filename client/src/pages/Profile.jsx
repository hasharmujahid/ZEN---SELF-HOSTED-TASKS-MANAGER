import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

function Profile() {
    const { user, updateProfile } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setProfession(user.profession || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateProfile({ username, email, profession, password: password || undefined });
            setMessage('Profile updated successfully');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '30px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '20px' }}>User Profile</h2>
                {message && <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>{message}</div>}
                {error && <div style={{ color: 'var(--danger-color)', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Profession</label>
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="e.g. Software Engineer"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;

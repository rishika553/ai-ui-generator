import React from 'react';

export const Navbar = ({ title = "Dashboard" }) => (
    <nav style={{ padding: '1rem', background: '#1a1a1a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Home</span>
            <span>Settings</span>
        </div>
    </nav>
);

export const Sidebar = () => (
    <div style={{ width: '200px', background: '#f4f4f4', padding: '1rem', borderRadius: '8px', height: '100%', minHeight: '300px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>Menu Item 1</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>Menu Item 2</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>Menu Item 3</li>
        </ul>
    </div>
);

export const Card = ({ text = "Content", title = "Card Title" }) => (
    <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #eee', flex: 1 }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>{title}</h4>
        <p style={{ margin: 0, color: '#666' }}>{text}</p>
    </div>
);

export const Button = ({ text = "Click Me" }) => (
    <button style={{ padding: '0.75rem 1.5rem', background: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        {text}
    </button>
);

export const Input = ({ placeholder = "Type here..." }) => (
    <input type="text" placeholder={placeholder} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }} />
);

export const Table = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
            <tr style={{ background: '#f4f4f4' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>1</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Sample</td>
            </tr>
        </tbody>
    </table>
);

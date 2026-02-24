import React from 'react';
import * as UI from './UIComponents';

const Preview = ({ plan }) => {
    if (!plan || !plan.components) return <p>No preview available</p>;

    const renderComponent = (comp, index) => {
        const Component = UI[comp.type];
        if (!Component) return <div key={index}>Unknown Component: {comp.type}</div>;
        return <Component key={index} {...comp.props} />;
    };

    return (
        <div className="preview-container" style={{
            marginTop: '2rem',
            padding: '2rem',
            background: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            color: '#1e293b'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#0f172a' }}>✨ Live Preview</h2>

            <div style={{
                display: plan.layout === 'dashboard' ? 'flex' : 'block',
                flexDirection: plan.layout === 'dashboard' ? 'row' : 'column',
                gap: '1rem'
            }}>
                {plan.layout === 'dashboard' && plan.components.some(c => c.type === 'Sidebar') && (
                    <div style={{ flex: '0 0 200px' }}>
                        {plan.components.filter(c => c.type === 'Sidebar').map(renderComponent)}
                    </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {plan.components.filter(c => c.type !== 'Sidebar').map(renderComponent)}
                </div>
            </div>
        </div>
    );
};

export default Preview;

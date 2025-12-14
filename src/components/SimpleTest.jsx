// Simple test component to verify React is working
const SimpleTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fef3c7',
      fontSize: '24px',
      color: '#d97706'
    }}>
      <div>
        <h1>✅ React is Working!</h1>
        <p>If you see this, React is rendering correctly.</p>
      </div>
    </div>
  );
};

export default SimpleTest;


const Mascot = ({ type = 'aura', position, delay = '0s' }) => {
  const getGradient = () => {
    switch(type) {
      case 'agnis': return 'linear-gradient(135deg, #f43f5e, #f59e0b)';
      case 'panda': return 'linear-gradient(135deg, #334155, #0f172a)';
      case 'aura':
      default: return 'linear-gradient(135deg, var(--primary), var(--secondary))';
    }
  };

  const getMessage = () => {
    switch(type) {
      case 'agnis': return "Let's build that streak!";
      case 'panda': return "Time to focus and eat bamboo.";
      case 'aura':
      default: return "Ready to seize your aura?";
    }
  };

  return (
    <div className="mascot-container" style={{ ...position, animationDelay: delay }}>
      <div className="mascot-bubble" style={{ color: type === 'agnis' ? '#f43f5e' : (type === 'panda' ? '#334155' : 'var(--primary)') }}>
        "{getMessage()}"
      </div>
      <div className="mascot-avatar" style={{ background: getGradient() }}>
        <div className="mascot-face">
          <span className="mascot-eye left"></span>
          <span className="mascot-eye right"></span>
          <span className="mascot-mouth"></span>
          {type === 'panda' && (
            <>
              <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', top: '4px', left: '2px', zIndex: -1 }}></div>
              <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', top: '4px', right: '2px', zIndex: -1 }}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mascot;

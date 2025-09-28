import React from 'react'
import { motion } from 'framer-motion'
import './ComicPanel.css'

const ComicPanel = (props) => {
  // Handle both prop structures: { panel, index } OR { character, dialogue, title, etc. }
  let panelData, index;

  if (props.panel) {
    // Case 1: Props passed as { panel: {...}, index: 0 }
    panelData = props.panel;
    index = props.index || 0;
  } else {
    // Case 2: Props passed directly { character: "🤔", dialogue: "...", index: 0 }
    panelData = {
      character: props.character || "🤔",
      dialogue: props.dialogue || "Let me think about this...",
      title: props.title || "Comic Panel",
      description: props.description || "A fun comic panel",
      bgColor: props.bgColor || "linear-gradient(135deg, #FFE4E1, #E6F3FF)",
      props: props.props || []
    };
    index = props.index || 0;
  }

  // Safe defaults in case panelData is still undefined
  const safePanel = {
    character: "🤔",
    dialogue: "Let me think about this...",
    title: "Comic Panel",
    description: "A fun comic panel",
    bgColor: "linear-gradient(135deg, #FFE4E1, #E6F3FF)",
    props: [],
    ...panelData
  };

  return (
    <motion.div 
      className="comic-panel"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="panel-number">Panel {index + 1}</div>
      <div className="panel-content">
        <div className="panel-illustration">
          <div 
            className="illustration-placeholder"
            style={{ background: safePanel.bgColor }}
          >
            <div className="character">
              <div className="character-face">
                <span className="character-emoji">{safePanel.character}</span>
              </div>
              <div className="speech-bubble">
                <p>{safePanel.dialogue}</p>
                <div className="bubble-tail"></div>
              </div>
            </div>

            {safePanel.props && safePanel.props.map((prop, propIndex) => (
              <div
                key={propIndex}
                className="panel-prop"
                style={{
                  left: prop.x,
                  top: prop.y,
                  fontSize: prop.size
                }}
              >
                {prop.emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="panel-description">
          <h4>{safePanel.title}</h4>
          <p>{safePanel.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ComicPanel
import React from 'react'
import { motion } from 'framer-motion'
import './ComicPanel.css'

const ComicPanel = ({ panel, index }) => {
  return (
    <motion.div 
      className="comic-panel"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="panel-number">
        Panel {index + 1}
      </div>
      
      <div className="panel-content">
        <div className="panel-illustration">
          <div className="illustration-placeholder" style={{ background: panel.bgColor }}>
            <div className="character">
              <div className="character-face">
                <span className="character-emoji">{panel.character}</span>
              </div>
              <div className="character-body">
                <div className="speech-bubble">
                  <p>{panel.dialogue}</p>
                  <div className="bubble-tail"></div>
                </div>
              </div>
            </div>
            
            {panel.props && panel.props.map((prop, propIndex) => (
              <motion.div 
                key={propIndex}
                className="panel-prop"
                style={{ 
                  left: prop.x,
                  top: prop.y,
                  fontSize: prop.size || '2rem'
                }}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  delay: propIndex * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {prop.emoji}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="panel-description">
          <h4>{panel.title}</h4>
          <p>{panel.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ComicPanel
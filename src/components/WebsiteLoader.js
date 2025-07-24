"use client"
import { useState, useEffect } from "react"

export default function WebsiteLoader({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [binaryColumns, setBinaryColumns] = useState([])

  useEffect(() => {
    // Generate static binary columns to avoid hydration mismatch
    const columns = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      bits: Array.from({ length: 20 }, () => Math.floor(Math.random() * 2).toString()),
    }))
    setBinaryColumns(columns)

    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onLoadingComplete) onLoadingComplete()
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="website-loader">
      <style jsx>{`
        .website-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: ${!isVisible ? "fadeOut 0.8s ease-out forwards" : "none"};
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        .data-loader {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        /* DNA Helix Animation */
        .dna-container {
          position: relative;
          width: 80px;
          height: 120px;
        }

        .dna-strand {
          position: absolute;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #09509e, rgba(9, 80, 158, 0.3), #09509e);
          border-radius: 2px;
          animation: dnaRotate 2s linear infinite;
        }

        .dna-strand:nth-child(1) {
          left: 20px;
          animation-delay: 0s;
        }

        .dna-strand:nth-child(2) {
          right: 20px;
          animation-delay: 1s;
        }

        .dna-base {
          position: absolute;
          width: 40px;
          height: 2px;
          background: rgba(9, 80, 158, 0.8);
          border-radius: 1px;
          left: 50%;
          transform: translateX(-50%);
          animation: dnaBase 2s linear infinite;
        }

        .dna-base:nth-child(3) { top: 10%; animation-delay: 0s; }
        .dna-base:nth-child(4) { top: 25%; animation-delay: 0.2s; }
        .dna-base:nth-child(5) { top: 40%; animation-delay: 0.4s; }
        .dna-base:nth-child(6) { top: 55%; animation-delay: 0.6s; }
        .dna-base:nth-child(7) { top: 70%; animation-delay: 0.8s; }
        .dna-base:nth-child(8) { top: 85%; animation-delay: 1s; }

        @keyframes dnaRotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes dnaBase {
          0%, 50% { opacity: 1; transform: translateX(-50%) scaleX(1); }
          25%, 75% { opacity: 0.3; transform: translateX(-50%) scaleX(0.5); }
        }

        /* Data Flow Animation */
        .data-flow {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .data-bit {
          width: 8px;
          height: 8px;
          background: #09509e;
          border-radius: 50%;
          animation: dataPulse 1.5s ease-in-out infinite;
        }

        .data-bit:nth-child(1) { animation-delay: 0s; }
        .data-bit:nth-child(2) { animation-delay: 0.1s; }
        .data-bit:nth-child(3) { animation-delay: 0.2s; }
        .data-bit:nth-child(4) { animation-delay: 0.3s; }
        .data-bit:nth-child(5) { animation-delay: 0.4s; }
        .data-bit:nth-child(6) { animation-delay: 0.5s; }
        .data-bit:nth-child(7) { animation-delay: 0.6s; }

        @keyframes dataPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1; 
          }
        }

        /* Neural Network Animation */
        .neural-network {
          position: relative;
          width: 100px;
          height: 60px;
        }

        .neuron {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #09509e;
          border-radius: 50%;
          animation: neuronPulse 2s ease-in-out infinite;
        }

        .neuron:nth-child(1) { top: 0; left: 0; animation-delay: 0s; }
        .neuron:nth-child(2) { top: 0; right: 0; animation-delay: 0.3s; }
        .neuron:nth-child(3) { top: 50%; left: 25%; animation-delay: 0.6s; }
        .neuron:nth-child(4) { top: 50%; right: 25%; animation-delay: 0.9s; }
        .neuron:nth-child(5) { bottom: 0; left: 0; animation-delay: 1.2s; }
        .neuron:nth-child(6) { bottom: 0; right: 0; animation-delay: 1.5s; }

        .connection {
          position: absolute;
          height: 1px;
          background: rgba(9, 80, 158, 0.4);
          animation: connectionFlow 2s linear infinite;
        }

        .connection:nth-child(7) {
          top: 6px;
          left: 12px;
          width: 76px;
          transform: rotate(0deg);
        }

        .connection:nth-child(8) {
          top: 30px;
          left: 6px;
          width: 30px;
          transform: rotate(45deg);
        }

        .connection:nth-child(9) {
          top: 30px;
          right: 6px;
          width: 30px;
          transform: rotate(-45deg);
        }

        @keyframes neuronPulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(9, 80, 158, 0.7);
          }
          50% { 
            transform: scale(1.2); 
            box-shadow: 0 0 0 10px rgba(9, 80, 158, 0);
          }
        }

        @keyframes connectionFlow {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }

        /* Binary Code Rain - Fixed for SSR */
        .binary-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .binary-column {
          position: absolute;
          top: -100px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: rgba(9, 80, 158, 0.1);
          animation: binaryFall 4s linear infinite;
        }

        .binary-column:nth-child(1) { left: 10%; animation-delay: 0s; }
        .binary-column:nth-child(2) { left: 20%; animation-delay: 0.5s; }
        .binary-column:nth-child(3) { left: 30%; animation-delay: 1s; }
        .binary-column:nth-child(4) { left: 40%; animation-delay: 1.5s; }
        .binary-column:nth-child(5) { left: 50%; animation-delay: 2s; }
        .binary-column:nth-child(6) { left: 60%; animation-delay: 2.5s; }
        .binary-column:nth-child(7) { left: 70%; animation-delay: 3s; }
        .binary-column:nth-child(8) { left: 80%; animation-delay: 3.5s; }
        .binary-column:nth-child(9) { left: 90%; animation-delay: 4s; }

        @keyframes binaryFall {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @media (max-width: 768px) {
          .dna-container {
            width: 60px;
            height: 90px;
          }
          
          .neural-network {
            width: 80px;
            height: 50px;
          }
          
          .data-bit {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>

      {/* Binary Rain Background - Fixed for SSR */}
      <div className="binary-rain">
        {binaryColumns.map((column, i) => (
          <div key={column.id} className="binary-column">
            {column.bits.map((bit, j) => (
              <div key={j}>{bit}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="data-loader">
        {/* DNA Helix */}
        <div className="dna-container">
          <div className="dna-strand"></div>
          <div className="dna-strand"></div>
          <div className="dna-base"></div>
          <div className="dna-base"></div>
          <div className="dna-base"></div>
          <div className="dna-base"></div>
          <div className="dna-base"></div>
          <div className="dna-base"></div>
        </div>

        {/* Data Flow */}
        <div className="data-flow">
          <div className="data-bit"></div>
          <div className="data-bit"></div>
          <div className="data-bit"></div>
          <div className="data-bit"></div>
          <div className="data-bit"></div>
          <div className="data-bit"></div>
          <div className="data-bit"></div>
        </div>

        {/* Neural Network */}
        <div className="neural-network">
          <div className="neuron"></div>
          <div className="neuron"></div>
          <div className="neuron"></div>
          <div className="neuron"></div>
          <div className="neuron"></div>
          <div className="neuron"></div>
          <div className="connection"></div>
          <div className="connection"></div>
          <div className="connection"></div>
        </div>
      </div>
    </div>
  )
}

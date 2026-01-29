
import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, RefreshCw } from 'lucide-react';

interface Props {
  onClose: () => void;
  productImage: string;
}

const VRTryOn: React.FC<Props> = ({ onClose, productImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' },
          audio: false 
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        setError("Camera permission denied. Please enable access to use VR Try-On.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <h2 className="font-syne font-bold text-xl uppercase tracking-tighter">VR Try-On</h2>
        <button onClick={onClose} className="p-2 glass-morphism rounded-full">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden bg-gray-900">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 rounded-full font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover grayscale opacity-60"
            />
            
            {/* Overlay Simulated Clothing */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72">
                 <img 
                  src={productImage} 
                  alt="Clothing overlay"
                  className="w-full h-full object-contain opacity-80 mix-blend-screen animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.8))' }}
                />
                <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-3xl animate-[ping_3s_infinite]"></div>
              </div>
            </div>

            <div className="absolute bottom-12 left-0 right-0 px-8">
               <div className="glass-morphism p-4 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] text-indigo-400 font-bold uppercase">AI Scanning...</p>
                       <p className="text-sm font-medium">Body frame detected</p>
                    </div>
                    <RefreshCw className="animate-spin text-indigo-500" size={20} />
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-2/3 animate-[shimmer_2s_infinite]"></div>
                  </div>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VRTryOn;

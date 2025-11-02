import React, { useRef, useEffect, useState } from 'react';
import { XIcon, ImageIcon } from './icons';

interface CameraViewProps {
    onCapture: (base64: string, mimeType: string) => void;
    onClose: () => void;
    onSelectFile: () => void;
}

const ShutterButton: React.FC = () => (
    <div className="w-20 h-20 rounded-full bg-white/30 p-2 cursor-pointer transition-transform hover:scale-110 active:scale-95">
        <div className="w-full h-full rounded-full bg-white" />
    </div>
);

const CameraFrame: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[90%] aspect-[3/4] max-w-md">
            {/* This creates the cutout effect */}
            <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)' }} />
            
            {/* Corner brackets for a more "scanner" feel */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
            <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
        </div>
    </div>
);


const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, onSelectFile }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setStream(mediaStream);
            } catch (err) {
                console.warn("Could not get environment camera, falling back to any camera:", err);
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                    setStream(mediaStream);
                } catch (fallbackErr) {
                    console.error("Error accessing any camera:", fallbackErr);
                    setError("Could not access the camera. Please check permissions and ensure another app isn't using it.");
                }
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            const MAX_DIMENSION = 1024;
            let { videoWidth: width, videoHeight: height } = video;

            if (width > height) {
                if (width > MAX_DIMENSION) {
                    height = Math.round(height * (MAX_DIMENSION / width));
                    width = MAX_DIMENSION;
                }
            } else {
                if (height > MAX_DIMENSION) {
                    width = Math.round(width * (MAX_DIMENSION / height));
                    height = MAX_DIMENSION;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                const base64 = dataUrl.split(',')[1];
                onCapture(base64, 'image/jpeg');
            }
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="camera-view-title">
            <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            <CameraFrame />

            {error && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/80 text-white p-4 rounded-lg text-center" role="alert">
                    <p>{error}</p>
                    <button onClick={onClose} className="mt-2 px-4 py-1 bg-white text-red-500 rounded font-semibold">Close</button>
                </div>
            )}
            
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-center">
                 <div className="text-center text-white flex-grow">
                    <h3 id="camera-view-title" className="text-lg font-bold">Capture Item</h3>
                    <p className="text-white/80 text-sm">Position the item within the frame</p>
                </div>
                <button onClick={onClose} className="text-white bg-black/50 rounded-full p-2" aria-label="Close camera">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-around items-center">
                <button onClick={onSelectFile} className="text-white bg-black/50 rounded-full p-3" aria-label="Select an image from gallery">
                    <ImageIcon className="w-8 h-8" />
                </button>
                
                <button onClick={handleCapture} aria-label="Capture photo">
                    <ShutterButton />
                </button>
                
                <div className="w-14 h-14" />
            </div>
        </div>
    );
};

export default CameraView;
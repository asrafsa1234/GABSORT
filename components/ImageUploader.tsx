import React, { useRef } from 'react';

interface ImageUploaderProps {
    onImageUpload: (base64: string, mimeType: string) => void;
    isLoading?: boolean;
    imagePreviewUrl?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading = false, imagePreviewUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            if (base64String) {
                onImageUpload(base64String, file.type);
            } else {
                console.error("Could not read file as base64 string.");
                alert("There was an error processing your image. Please try another one.");
            }
        };
        reader.onerror = () => {
            console.error("FileReader error");
            alert("There was an error reading your file. Please try again.");
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    if (isLoading && imagePreviewUrl) {
        return (
            <div className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white min-h-[280px]">
                <img src={imagePreviewUrl} alt="Preview" className="max-h-48 w-auto object-contain rounded-md opacity-40" />
                <div className="absolute inset-0 bg-white bg-opacity-60 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-800 font-semibold">Analyzing your item...</p>
                    <p className="text-sm text-gray-600">This may take a moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg h-full bg-white min-h-[280px]">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
             <div className="text-center">
                 <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-800">Upload a photo</h3>
                <p className="mt-1 text-sm text-gray-500">Identify an item to see if it's recyclable.</p>
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Select Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
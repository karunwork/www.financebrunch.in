
import React, { useEffect, useRef } from 'react';

export function BullBearAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Load images
    const bullImage = new Image();
    bullImage.src = '/lovable-uploads/06b665ec-50f4-4f68-b7fe-836df10af649.png';
    
    const bearImage = new Image();
    bearImage.src = '/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png';
    
    let bullX = -100;
    let bearX = canvas.width + 100;
    const centerX = canvas.width / 2 - 50;
    
    // Animation function
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw bull moving from left to center
      if (bullX < centerX - 100) {
        bullX += 2;
      }
      
      // Draw bear moving from right to center
      if (bearX > centerX + 100) {
        bearX -= 2;
      }
      
      // Draw images
      ctx.drawImage(bullImage, bullX, 10, 150, 150);
      ctx.drawImage(bearImage, bearX, 10, 150, 150);
      
      // Draw market trend line in the middle
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Continue animation
      requestAnimationFrame(animate);
    }
    
    // Start animation when images are loaded
    const startAnimation = () => {
      if (bullImage.complete && bearImage.complete) {
        animate();
      } else {
        bullImage.onload = bearImage.onload = () => {
          animate();
        };
      }
    };
    
    startAnimation();
    
    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bullX = -100;
      bearX = canvas.width + 100;
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 py-6">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bulls vs Bears: The Market Forces</h2>
        <canvas 
          ref={canvasRef} 
          className="w-full h-[180px] mx-auto"
        ></canvas>
        <div className="flex justify-center gap-16 mt-2">
          <div className="text-center">
            <p className="font-semibold text-green-600 dark:text-green-400">BULLS</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optimistic investors expecting rising markets</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-red-600 dark:text-red-400">BEARS</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cautious investors expecting falling markets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

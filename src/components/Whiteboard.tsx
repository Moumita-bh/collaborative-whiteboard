import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas('whiteboard-canvas' , {
      isDrawingMode: true,
    });

    canvasRef.current = canvas;

    canvas.on('path:created', (e: any) => {
        const path = e.path;
        socket.emit('draw' , path.toObject(['path', 'left', 'top', 'stroke', 'strokeWidth']));
    });

    socket.on('draw' , (data: any) => {
       if(canvas && data.path){
        const path = new fabric.Path(data.path, data);
        canvas.add(path);
        canvas.renderAll();
       }
    });

    return () => {
      socket.off('draw');
     canvas.dispose();
    }
  }, []);

  return(
    <div className="text-center">
      <canvas id="whiteboard-canvas" width={800} height={600} style={{border: '1px solid #000'}}/>
    </div>
  );

};

export default Whiteboard;
import React from 'react';

interface ToolbarProps {
    onUndo: () => void;
    onRedo: () => void;
    onColorChange: (color: string) => void;
    onBrushSizeChange: (size: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    onUndo,
    onRedo,
    onColorChange,
    onBrushSizeChange,

}) => {
  
    return(
      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-secondary" onClick={onUndo}>Undo</button>
        <button className="btn btn-secondary" onClick={onRedo} >Redo</button>

        <input 
         type="color"
         onChange={(e) => onColorChange(e.target.value)}
         title="pick brush color"
        
        />

       <input
        type="range"
        min={1}
        max={50}
        defaultValue={5}
        onChange={(e) => onBrushSizeChange(Number(e.target.value))}
        title="Brush size"
      />
      </div>

    );
};

export default Toolbar;


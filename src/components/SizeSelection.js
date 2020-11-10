import React from "react"


const SizeSelection = (props) => {
    let { sizes, setSize, selectedSize } = props;
    return (
        <div className="size-list">
            {sizes.map((e) =>
                <button key={e} onClick={() => setSize(e)}
                    className={selectedSize === e ? "size-item selected" : "size-item"}>
                    {e} 
                </button>)
            }
        </div >
    );
}

export default SizeSelection;
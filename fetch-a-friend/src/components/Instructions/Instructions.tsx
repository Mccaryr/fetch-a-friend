import React, {useState} from 'react'
import './Instructions.scss'

const Instructions = () => {
    const [showInstructions, setShowInstructions] = useState<boolean>(false)
    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <button
                    className={!showInstructions ? "info-btn" : "info-btn rotated"}
                    onClick={() => setShowInstructions(!showInstructions)}>
                    <i className="fa-solid fa-caret-right"></i>
                </button>
                <h1>How it Works</h1>

            </div>
            {showInstructions && (
                <div>
                    To get your paws on your fur-ever friend you can filter by distance, age, and breed
                    to view a list of awesome doggos. You can then click on the heart to <span>favorite</span>
                    the ones you've fallen in love with. Then you can press the "Find Fur-ever friend" button that will use
                    our state of the art AI to match you with your new best friend.
                </div>
            )}
        </div>
    )
}
export default Instructions

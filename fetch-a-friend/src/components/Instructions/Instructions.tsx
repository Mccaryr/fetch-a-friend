import  {useState} from 'react'
import './Instructions.scss'

const Instructions = () => {
    const [showInstructions, setShowInstructions] = useState<boolean>(true)
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
                <div className={"instructions"}>
                    <p> To get your <i className="fa-solid fa-paw"></i> on your fur-ever friend you can use the filters below
                        to view a list of awesome doggos.
                    </p>
                    <p>
                        You can then click on the <i className="fa-solid fa-heart"/> to <span>favorite </span>
                        the ones you've fallen in love with.
                    </p>
                    <p>
                    Then you can press the <strong>"Find Fur-ever friend"</strong> button that will match you with your new bff.
                    </p>
                </div>
            )}
        </div>
    )
}
export default Instructions

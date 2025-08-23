import { RefreshCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ErrorCard = ({ message, loading, action, clearAction, isvisible }) => {

    const [isShown, setShown] = useState(isvisible || true)

    const dispatch = useDispatch();

    if (!message) return null;

    useEffect(() => {
        console.log("isShown:", isShown);
        console.log("isVisible", isvisible)

        return () => {
            if (clearAction) dispatch(clearAction());
        }
    }, [])


    return (

        <>
            {isShown && <div style={{
                width: "100%",
                height: "100%",
                backdropFilter: "blur(2px)",
                border: "1px solid #f8f8f83f",
                borderBottom: 0,
                borderTop: 0,
                background: "#3c3d3b11",
                display: "flex",
                gap: "clamp(0.8rem,1vw,1rem)",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
            }}>

                {isvisible && <button
                    onClick={() => {
                        setShown(false)
                        if (clearAction) dispatch(clearAction());
                    }}
                    style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        padding: "clamp(0.8rem,1vw,1rem)",
                        borderRadius: "50%",
                        border: "none",
                    }}>
                    <X />
                </button>}

                <div
                    style={{
                        width: "fit-content",
                        padding: "clamp(0.8rem,1vw,1rem)",
                        border: "1px solid #f44336",
                        borderRadius: "8px",
                        background: "#ffebee",
                        color: "#b71c1c",
                        display: "flex",
                        gap: "clamp(0.6rem,1vw,0.8rem)",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <span style={{ fontSize: "clamp(0.8rem,1vw,1rem)", fontWeight: "500" }}>{message}</span>

                    {action &&
                        <button
                            onClick={action}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                color: "#b71c1c",
                            }}
                            disabled={loading && true}
                        >
                            <RefreshCcw style={{ marginTop: "2px" }} />
                        </button>}

                </div>
            </div>}
        </>

    )
}

export default ErrorCard;
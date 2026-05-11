import React, { useState } from "react"
import "./index.css"

interface PanelProps {
    title: string;
    content: React.ReactNode;
    copyValue?: string;
    isKey?: boolean;
}

const Panel: React.FC<PanelProps> = ({ title, content, copyValue, isKey }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (copyValue) {
            navigator.clipboard.writeText(copyValue)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const truncateKey = (key: string) => {
        if (key.length <= 12) return key
        return `${key.slice(0, 6)}...${key.slice(-6)}`
    }

    return (
        <article className="message">
            <div className="message-header">
                <p>{title}</p>
                {copyValue && (
                    <button className="copy-button" onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                )}
            </div>
            <div className={`message-body ${isKey ? "key-content" : ""}`}>
                {isKey && typeof content === "string" ? (
                    <>
                        <span className="key-full">{content}</span>
                        <span className="key-truncated">{truncateKey(content)}</span>
                    </>
                ) : (
                    content
                )}
            </div>
        </article>
    )
}

export default Panel

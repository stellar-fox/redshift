import React from "react"

import "./index.css"




interface PanelProps {
    title: string;
    content: React.ReactNode;
}

// <Panel> component
const Panel: React.FC<PanelProps> = ({ title, content }) => (
    <article className="message">
        <div className="message-header">
            <p>{title}</p>
        </div>
        <div className="message-body">{content}</div>
    </article>
)

export default Panel

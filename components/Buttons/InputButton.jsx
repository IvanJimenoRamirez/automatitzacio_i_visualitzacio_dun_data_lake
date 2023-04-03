'use client'

import { useEffect } from "react";

export function InputButton({ type, parentId, label, name, className }) {
    
    const activeAnim = (e) => {
        let parent = e.parentNode;
        parent.classList.add(className);
        if (e.tagName === "LABEL") parent.querySelector("input").focus();
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            // If the click is outside the input, remove the class "Active". Only if the input has no value
            if (e.target.tagName !== "INPUT" && e.target.tagName !== "LABEL") {
                let parent = document.getElementById(parentId);
                if (parent.querySelector("input").value === "") parent.classList.remove(className);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div id={parentId} onClick={e => e.target.classList.add(className)}>
            <label htmlFor={name} onClick={e => activeAnim(e.target)}>{label}</label>
            <input name={name} type={type} onClick={e => activeAnim(e.target)} onFocus={e => activeAnim(e.target)} />
        </div>
    )
}
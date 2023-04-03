'use client'

import Image from "next/image";
import menuImage from "../../public/icons/menu.svg";

export function NavbarButton({ navbarId, className }) {
    // This function is used to add the class "Active" to the parent of the button when the button is clicked
    const activeAnim = (e) => {
        let parent = document.querySelector(`#${navbarId}`);
        if (parent.classList.contains(className)) {
            // Change the variable --nabbarWidth to the new width of the navbar
            document.documentElement.style.setProperty("--navbarWidth", "75px");
            parent.classList.remove(className);
        }
        else {
            document.documentElement.style.setProperty("--navbarWidth", "250px");
            parent.classList.add(className);
        }
    }

    return (
        <button onClick={e => activeAnim(e.target)}>
            <Image src={menuImage} alt="Menu" width={25} height={25}></Image>
        </button>
    )
}

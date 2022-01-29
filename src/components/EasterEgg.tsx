import { Component, ReactNode } from "react";
import Script from "next/script";

export class EasterEgg extends Component {
    render(): ReactNode {
        return (
            <>
                <Script>{`
                    //  
                    let pattern_easteregg1 = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
                    let current_easteregg1 = 0;
                    let easteregg1 = function (event) {
                        if (pattern_easteregg1.indexOf(event.key) < 0 || event.key !== pattern_easteregg1[current_easteregg1]) {
                            current = 0;
                            return;
                        }
                    
                        current_easteregg1++;
                    
                        if (pattern_easteregg1.length === current_easteregg1) {
                            current = 0;
                            window.open('https://google.com/');
                        }
                    
                    };
                    
                    // Listeners
                    
                    document.addEventListener('keydown', easteregg1, false);
                `}</Script>   
            </>
        );
    }
}
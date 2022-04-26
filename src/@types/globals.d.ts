export {};

declare global {
    var test = "test";

    interface Window {
        changeMode: (mode: "dark" | "light") => void;
    }
}
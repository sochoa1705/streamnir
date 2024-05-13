import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-6 py-4 text-center">
            <p className="mb-4">© 2024 Streaming Service. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
                <a href="/terms" className="hover:underline">Terms</a>
                <a href="/privacy" className="hover:underline">Privacy</a>
                <a href="/about" className="hover:underline">About</a>
            </div>
        </footer>
    )
}
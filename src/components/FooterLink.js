import React, { useState } from "react";
import { Footer } from "antd/es/layout/layout";
import { GithubFilled, CodeFilled, GitlabFilled } from "@ant-design/icons";

export default function FooterLink() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const linkStyle = (index) => ({
        color: hoveredIndex === index ? "#1777FF" : " #a6a6a6",
        transition: "color 0.5s",
    });

    const links = [
        { href: "https://github.com/0xSirawit", icon: <GithubFilled /> },
        { href: "https://gitlab.psu.ac.th/6710110443", icon: <GitlabFilled /> },
        { href: "https://0xsirawit.github.io", icon: <CodeFilled /> },
    ];

    return (
        <Footer
            style={{
                justifyContent: "center",
                display: "inline-flex",
                gap: "20px",
                fontSize: 20,
            }}
        >
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    style={linkStyle(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {link.icon}
                </a>
            ))}
        </Footer>
    );
}

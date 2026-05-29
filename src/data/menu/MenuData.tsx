import {
    House,
    Newspaper,
    Puzzle,
    Users,
} from "lucide-react";
import NextImage from "next/image";

export const Items = [
    {
        id: 1,
        icon: <House size={32} color="#78C751"/>,
        label: "Bienvenue",
        color: "#78C751",
        link: "/",
    },
    {
        id: 2,
        icon: <Puzzle size={32} color="#D90A5C"/>,
        label: "La solution",
        color: "#D90A5C",
        link: "/solution",
    },
    {
        id: 4,
        icon: <Users size={32} color="#FD6E00"/>,
        label: "À propos",
        color: "#FD6E00",
        link: "/uvibes",
    },
    {
        id: 5,
        icon: <Newspaper size={32} color="#78C751"/>,
        label: "Blog",
        color: "#78C751",
        link: "/blog",
    },
    {
        id: 7,
        icon: (
            <NextImage
                src="/images/icone-connexion.svg"
                width={100}
                height={100}
                alt="Logo Connexion"
                className="icon-connexion"
            />
        ),
        label: "",
        color: "linear-gradient(90deg, #f76213 53%, #f62570 100%)",
        link: "https://app.uvibes.fr/welcome",
    },
];

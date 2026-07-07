import "@/componentes/Header/Header.css";
import Link from "next/link";
import LogoutButton from "../LogoutButton/LogoutButton";

export default async function Header(){

  
    return(
        <header className='header'>
                <nav>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=q_i8WmC29tQ" target='_blank'>Sobre</a></li>| 
                        <li><Link href="/">Página Oficial</Link></li>
                    </ul>
                </nav>
                <div>
                    <ul>
                        <li><Link href="/login">Login</Link></li>
                        <li><LogoutButton/></li>
                    </ul>
                </div>
        </header>
    )
}
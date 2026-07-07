import "@/componentes/Header/Header.css";
import Link from "next/link";
import LogoutButton from "../LogoutButton/LogoutButton";

export default async function Header(){

  
    return(
        <header className='header'>
                <nav>
                    <ul>
                        <li><a href="https://www.youtube.com/shorts/_6HzLIJPH2A" target='_blank'>Sobre</a></li>| 
                        <li><a href="https://www.youtube.com/watch?v=pkACVyU4PmA&list=RDpkACVyU4PmA&start_radio=1" target='_blank'>Página Oficial</a></li>
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
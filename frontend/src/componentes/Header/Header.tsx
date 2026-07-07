import "@/componentes/Header/Header.css";
import Link from "next/link";

export default async function Header(){
    return(
        <header className='header'>
                <nav>
                    <ul>
                        <li><a href="{}">Sobre</a></li>| 
                        <li><Link href="/" target='_blank'>Página Oficial</Link></li>
                    </ul>
                </nav>
                <div>
                    <ul>
                        {/* COlocar rota para login de usuario */}
                        <li><Link href="/" target='_blank'>Login</Link></li> 
                    </ul>
                </div>
        </header>
    )
}
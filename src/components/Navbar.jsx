import NavbarCSS from './Navbar.module.css'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className={NavbarCSS.nav}>
            <div className={NavbarCSS.navContainer}>
                <CustomLink to="/music">music</CustomLink>
                <CustomLink to="/cathartic">logoPlaceHolder</CustomLink>
                <CustomLink to="/photobook">photobook</CustomLink>
            </div>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}
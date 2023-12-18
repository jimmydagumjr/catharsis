import NavbarCSS from './../assets/css/Navbar.module.css'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {
    return (
        <NavbarContainer />
    )
}

const NavbarContainer = () => {
    return (
        <nav className={NavbarCSS.nav}>
            <div className={NavbarCSS.navContainer}>
                <div className={NavbarCSS.navFilter}>
                    <div className={NavbarCSS.navPrimaryContainer}>
                        <div className={NavbarCSS.navPrimary}>
                            <NavbarLinks />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavbarLinks = () => {
    return (
        <>
            <div className={NavbarCSS.navLeft}>
                <CustomLink to="/music">music</CustomLink>
            </div>
            <div className={NavbarCSS.logo}>
                <CustomLink to="/cathartic">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="22" height="22" viewBox="0 0 220 220"><path d="M110 0C49.346 0 0 49.346 0 110s49.346 110 110 110 110-49.346 110-110S170.654 0 110 0zm0 190c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80zm29.718-61.736 16.218 15.065-8.172 7.152c-10.236 8.956-23.312 13.89-36.817 13.89-30.344 0-55.031-24.178-55.031-53.895 0-29.649 24.687-53.771 55.031-53.771a55.695 55.695 0 0 1 36.692 13.764l7.873 6.89L139.97 92.91l-6.901-6.097c-5.937-5.243-13.792-8.131-22.122-8.131-18.226 0-33.054 14.263-33.054 31.793 0 17.6 14.828 31.918 33.054 31.918 8.238 0 16.094-2.933 22.122-8.258l6.649-5.871z" /></svg>
                </CustomLink>
            </div>
            <div className={NavbarCSS.navRight}>
                <CustomLink to="/gallery">gallery</CustomLink>
            </div>
        </>
    )
}

const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </div>
    )
}

export default Navbar
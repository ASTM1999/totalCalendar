import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/practice">Practice</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/registerOption">Sign With Google</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home
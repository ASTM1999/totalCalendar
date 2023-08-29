import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/practice">Practice</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home
import { Link } from "react-router-dom";
import { useUserContext } from '../context/UserContext.jsx';

function Navbar() {
    const { user } = useUserContext();

    return <nav className="navbar">
        <div className="navbar-links">
            <Link to='/Profile'>Profile</Link>
        </div>
        <div className="navbar-links">
            <Link to='/NearYou'>Near you</Link>
        </div>
        {!user 
            ? <div className="navbar-links">
                 <Link to='/Landing'>Landing</Link>
            </div>
            :<div className="navbar-links">
                <Link to='/Home'>Home</Link>
            </div>
        }
    </nav>
}

export default Navbar;
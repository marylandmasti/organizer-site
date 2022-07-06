import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Announcements</Link>
          </li>
          <li>
            <Link to="/registeredparticipants">Registered Participants</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Nav;

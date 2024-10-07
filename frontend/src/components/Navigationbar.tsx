const Navbar = () => {
  return (
    <nav className="">
      <ul>
        <li><a href="/user/home">Home</a></li>
        <li><a href="/user/signup">Signup</a></li>
        <li><a href="/user/login">Login</a></li>
        <li><a href="/admin/login">Admin Login</a></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
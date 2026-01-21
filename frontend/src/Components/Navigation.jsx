import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "../Context/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const userInitial = user?.name?.charAt(0).toUpperCase();

  useEffect(() => {
    if (user) {
      setShowLogin(false);
      setShowSignup(false);
      setShowMenu(false);
    }
  }, [user]);


  return (
    <>
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HomeEase</h1>

        <div className="flex items-center space-x-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/reviews">Reviews</Link>
          {user && <Link to="/orders">Orders</Link>}

          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer font-bold"
              >
                {userInitial}
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow">
                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLogin && (
        <LoginForm
          closeModal={() => setShowLogin(false)}
          goToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupForm
          closeModal={() => setShowSignup(false)}
          goToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Navigation;

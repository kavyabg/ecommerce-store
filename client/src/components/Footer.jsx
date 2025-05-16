import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} BlossomBeauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

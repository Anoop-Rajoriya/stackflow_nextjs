import React from "react";

function Footer() {
  return (
    <footer className="p-2 text-center text-secondary-foreground capitalize text-sm">
      &copy; {new Date().getFullYear()} | Created By Anoop Rajoriya
    </footer>
  );
}

export default Footer;

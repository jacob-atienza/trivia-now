/* eslint-disable react/react-in-jsx-scope */
/*
 * File: Footer.tsx
 * Programmer: Jacob Atienza
 * Date: 2/28/2025
 * Description: Footer at the bottom of the project
 */

const Footer = () => {
  return (
    <footer className="text-md mx-auto flex flex-row space-x-10 p-4 text-center text-white sm:text-lg">
      <p>Developed By: Jacob Atienza</p>
      <a href="https://jacobatienza.me" className="underline">
        About me + My other work
      </a>
    </footer>
  );
};

export default Footer;

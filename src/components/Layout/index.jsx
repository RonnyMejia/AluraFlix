import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 px-8 shadow-lg fixed top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-300">Pixa</span>Photos
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-20 w-full max-w-6xl px-4 lg:px-8 py-8 flex flex-col gap-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 text-center mt-auto shadow-lg">
        <p className="text-base font-medium">
          © {new Date().getFullYear()} <span className="font-bold">PixaPhotos</span>. All rights reserved by <span className="font-bold">Ronny Mejia</span>
        </p>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

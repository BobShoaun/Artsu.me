import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ArtworkPage = () => {
  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-20">

      <h1 className="text-2xl text-white">this is artwork page</h1>
      </div>
      <Footer />
    </main>
  );
};

export default ArtworkPage;

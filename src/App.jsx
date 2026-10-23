import Loader from './components/layout/Loader';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Showreel from './components/sections/Showreel';
import About from './components/sections/About';
import Headshots from './components/sections/Headshots';
import Filmography from './components/sections/Filmography';
import CoStars from './components/sections/CoStars';
import Theatre from './components/sections/Theatre';
import Awards from './components/sections/Awards';
import Modelling from './components/sections/Modelling';
import Makeup from './components/sections/Makeup';
import Photoshoots from './components/sections/Photoshoots';
import Press from './components/sections/Press';
import Contact from './components/sections/Contact';
import { ContentProvider } from './content/ContentContext';

const SECTIONS = [Hero, Marquee, Showreel, About, Headshots, Filmography, Modelling, Photoshoots, Makeup, Theatre, CoStars, Awards, Press, Contact];

export default function App() {
  return (
    <ContentProvider>
      <Loader />
      <Nav />
      <main>
        {SECTIONS.map((Section, i) => (
          <Section key={i} />
        ))}
      </main>
      <Footer />
    </ContentProvider>
  );
}

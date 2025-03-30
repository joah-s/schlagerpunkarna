
import Land from '@/app/ui/pages/land'
import Intro from '@/app/ui/pages/intro'
import Characters from '@/app/ui/pages/characters'
import Music from '@/app/ui/pages/music'
import Reviews from '@/app/ui/pages/reviews'
import Videos from '@/app/ui/pages/videos'
import Form from '@/app/ui/pages/form'
import Footer from '@/app/ui/pages/footer'
import Header from './header'
import { motion } from 'framer-motion';

function scrollToElement(id: string) {
  const element = document.getElementById(id);

  if (element) {
    const offsetTop = element.offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }
}

export default function Page() {

  return (
    <main className="relative text-white ">
      <Header />
      

      <a className=" hidden md:block" >
        <div className={`fixed bottom-0 right-3 mb-3 z-50 transition-all duration-300`}>
          <button className="text-textColor dark:text-textColorDark bg-secondary dark:bg-secondaryDark  dark:text-black rounded-full  shadow-sm drop-shadow-xl p-4 hover:scale-105 transition-all">
            <svg className="w-6 h-6 transform transition-transform duration-200 group-hover:-rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9l-7 7-7-7" transform="rotate(180 12 12)"></path>
            </svg>
          </button>
        </div>
      </a>

      <div id="land">
        <Land />
      </div>
      <div id="about">
        <Intro />
        <Characters />
        <div className="hidden md:block">
          <Reviews />
        </div>
      </div>
      <div id="music">
        <Music />
        <Videos />
      </div>
      <div id="contact">
        <Form />
        <Footer />
      </div>

    </main >
  );
}



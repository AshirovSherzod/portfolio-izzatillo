import React from 'react'
import './home.css'
import Hero from '../../components/hero/Hero'
import About from '../../components/about/About'
import Services from '../../components/services/Services'
import Portfolio from '../../components/portfolio/Portfolio'
import Contact from '../../components/contact/Contact'
import Header from '../../components/header/Header'

function Home() {
    return (
        <main>
            <div className="header-bg__wrapper">
                <Header />
                <Hero />
            </div>
            <About />
            <Services />
            <Portfolio />
            <Contact />
        </main>
    )
}

export default Home
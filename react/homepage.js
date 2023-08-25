import React from 'react';
import './style.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    componentDidMount() {
        this.startSlideshow();
    }

    componentWillUnmount() {
        this.stopSlideshow();
    }

    startSlideshow() {
        this.slideshowInterval = setInterval(() => {
            this.changeSlide(1);
        }, 5000);
    }

    stopSlideshow() {
        clearInterval(this.slideshowInterval);
    }

    changeSlide(n) {
        const { slideIndex } = this.state;
        const slides = document.getElementsByClassName('slide');
        let newIndex = slideIndex + n;

        if (newIndex >= slides.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = slides.length - 1;
        }

        this.setState({ slideIndex: newIndex });
    }

    render() {
        const { slideIndex } = this.state;

        return (
            <div className="container">
                <header>
                    <h1>Min Responsiva Hemsida</h1>
                </header>

                <div className="content">
                    <div className="text">
                        <h2>Kära vänner och familj</h2>
                        <p>
                            Vi ville dela med oss av en spännande nyhet till er. Vi har just gift oss på en helt unik plats -
                            Arlanda flygplats! Istället för att ha ett stort bröllop valde vi att följa vårt hjärta och göra det vi
                            älskar mest - att resa tillsammans.
                        </p>
                        <p>
                            Vi är nu på väg till en fantastisk destination som har varit på vår önskelista under lång tid. Vi flyger
                            till det vackra Sydafrika och vår första destination är Cape Town. Vi ser fram emot att upptäcka stadens
                            rika kultur, njuta av den hisnande naturen och skapa minnen som varar för livet.
                        </p>
                        <p>
                            Under vår resa kommer vi att dokumentera våra äventyr och dela med oss av bilder här, för er som är
                            nyfikna och vill vara en del av vårt bröllop på distans. Vi vet att ni finns i våra hjärtan även om ni
                            inte är fysiskt närvarande, och vi ser fram emot att dela den här speciella tiden med er.
                        </p>
                        <p>
                            Tack för ert stöd och er kärlek. Vi är så tacksamma för att ha er i våra liv och vi ser fram emot att
                            återförenas och dela mer om våra resaupplevelser när vi kommer tillbaka.
                        </p>
                        <p>
                            Med kärlek,
                            Tommy och Julia.
                        </p>
                    </div>

                    <div className="slideshow-container">
                        <img className="slide" src="bild1.png" alt="Bild 1" style={{ display: slideIndex === 0 ? 'block' : 'none' }} />
                        <img className="

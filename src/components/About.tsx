function About() {
    const openTerraDashboardTwitterTab = () => {
        window.open("https://twitter.com/TerraDashboard", '_blank');
    }

    const openHODLFishTwitterTab = () => {
        window.open("https://twitter.com/hodlfishlabs", '_blank');
    }

    const openWebsiteTab = () => {
        window.open("https://hodlfish.io", '_blank');
    }

    return (
        <div id="about-component">
            <div id="about-toolbar">
                <div id="about-toolbar-container">
                    <svg className="twitter" onClick={openHODLFishTwitterTab}>
                        <use href="#twitter"/>
                    </svg>
                    <div onClick={openWebsiteTab}>
                        HODLFish Labs
                    </div>
                </div>
            </div>
            <div id="about-content">
                <div className="info-container">
                    <div className="info-container-header">
                        <svg width="32" height="32">
                            <use href="#logo"/>
                        </svg>
                        <div className="info-container-title">Welcome!</div>
                    </div>
                    <div className="info-container-content">
                        <p>
                            Terra Dashboard is a customizable dashboard for the Terra blockchain.  
                            We support a collection of widgets showcasing data from various protocols and we will continue to add more. 
                        </p>
                        <p>
                            Let us know on twitter what you want to see next!
                        </p>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info-container-header">
                        <svg width="32" height="32">
                            <use href="#luna"/>
                        </svg>
                        <div className="info-container-title">Early Access</div>
                    </div>
                    <div className="info-container-content">
                        <p>
                            This site is currently in early release; there are going to be bugs.
                        </p>
                        <p>
                            We hope even with occasional issue you can find this site useful.
                            We will continue to update and try to maintain compatibility with previous versions.
                        </p>
                        <p>Feel free to report any bugs you find to <span onClick={openTerraDashboardTwitterTab}>@TerraDashboard</span></p>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info-container-header">
                        <svg width="32" height="32" className="download">
                            <use href="#download"/>
                        </svg>
                        <div className="info-container-title">Locally Saved</div>
                    </div>
                    <div className="info-container-content">
                        <p>
                            Since your dashboards are saved locally, 
                            clearing your browsers local storage will delete your saved dashboards.
                        </p>
                        <p>
                            You can preserve your dashboards permanently by downloading them as a JSON file. 
                            This also allows you to upload them on different computers and share them!
                        </p>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info-container-header">
                        <svg width="32" height="32">
                            <use href="#terra"/>
                        </svg>
                        <div className="info-container-title">Hosting data?</div>
                    </div>
                    <div className="info-container-content">
                        <p>
                            We're always looking for new and useful data to support on the site.
                        </p>
                        <p>
                            If you want your data added to a widget, reach out out to us!
                        </p>
                        <p>
                            We give credit for all of the data on our site in the settings panel for each widget, and we will happily link to your site.
                        </p>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info-container-header">
                        <svg width="32" height="32" className="twitter">
                            <use href="#twitter"/>
                        </svg>
                        <div className="info-container-title">Follow us!</div>
                    </div>
                    <div className="info-container-content">
                        <p>
                            Terra Dashboard <span onClick={openTerraDashboardTwitterTab}>@TerraDashboard</span>
                        </p>
                        <p>
                            HODLFish Labs <span onClick={openHODLFishTwitterTab}>@hodlfishlabs</span>
                        </p>
                        <p>
                            Check out our website at <span onClick={openWebsiteTab}>hodlfish.io</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;

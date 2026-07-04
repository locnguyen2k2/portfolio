/* eslint-disable jsx-a11y/iframe-has-title */
import './Sportify.scss';

export default function SportifyWidget() {
    return (
        <div className="spotify-widget">
            <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/2k6R0s9YLTFGsNq6XOM3Ec?utm_source=generator&theme=0&si=9b5618069c904a40"
                width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">

            </iframe>
        </div>
    )
}
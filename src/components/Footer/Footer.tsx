import React from 'react';
import './Footer.css';
import LogoLight from '../../images/600px-CyberX_lightmode.png';
import LogoDark from '../../images/600px-CyberX_darkmode.png';
import Inst from '../../images/inst.svg';
import Twit from '../../images/twit.svg';
import YouTube from '../../images/youtube.svg';
import { useTheme } from '../../ThemeContext';

interface Section {
    title: string;
    links: { text: string, href: string }[];
    className: string;
}

interface SocialLink {
    icon: string;
    alt: string;
}

const Footer: React.FC = () => {
    const { theme } = useTheme();
    const logoSrc = theme === 'light' ? LogoLight : LogoDark;
    const sections: Section[] = [
        {
            title: 'COMPANY',
            links: [
                { text: 'Home', href: '*' },
                { text: 'Order', href: '*' },
                { text: 'FAQ', href: '*' },
                { text: 'Contact', href: '*' }
            ],
            className: 'company'
        },
        {
            title: 'TEMPLATE',
            links: [
                { text: 'Style Guide', href: 'https://www.google.com/' },
                { text: 'Changelog', href: 'https://www.google.com/' },
                { text: 'Licence', href: 'https://www.google.com/' },
                { text: 'Webflow University', href: 'https://www.google.com/' }
            ],
            className: 'template'
        },
        {
            title: 'FLOWBASE',
            links: [
                { text: 'More Cloneables', href: '*' }
            ],
            className: 'flowbase'
        }
    ];

    const socialLinks: SocialLink[] = [
        { icon: Inst, alt: 'Instagram' },
        { icon: Twit, alt: 'Twitter' },
        { icon: YouTube, alt: 'YouTube' }
    ];

    return (
        <footer className='footer'>
            <div className='footer__linksblock'>
                <div className='logoblock'>
                    <img className='footer__logo' src={logoSrc} alt="CyberX" />
                    <p>Takeaway & Delivery template <br /> for small - medium businesses.</p>
                </div>
                {sections.map((section, index) => (
                    <div className={section.className} key={index}>
                        <b>{section.title}</b>
                        {section.links.map((link, linkIndex) => (
                            <a href={link.href} key={linkIndex}>{link.text}</a>
                        ))}
                    </div>
                ))}
            </div>
            <hr />
            <div className='footer__socialblock'>
                <p>Built by <a href='*'>Flowbase</a> · Powered by <a href='*'>Webflow</a></p>
                <div className='footer__social'>
                    {socialLinks.map((social, index) => (
                        <div className='footer__social--logo' key={index}>
                            <img src={social.icon} alt={social.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;

import './about.scss'
import Label from "../../atoms/Lable/Label";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../../Context";
import Project from "../project/Project";
import Skill from "../skill/Skill";
import { MailOutlined, LinkedinOutlined, FacebookFilled } from "@ant-design/icons"

export default function About() {
    const { t } = useTranslation();
    const { language } = useContext(Context);

    return (
        <>
            <div id={'about'} className={`${language}`} style={{ backdropFilter: 'blur(0.4px)' }}>
                <div className={"quote"} style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <p style={{ fontSize: '0.8rem' }}>
                        <span className={'tag'}>&lt;quote&gt;</span>
                        “Try and leave this world a little better than you found it, and when your turn comes to die you can die happy in feeling that at any rate you have not wasted your time but have done your best.”
                        <span className={'tag'}>&lt;/quote&gt;</span>
                        <br /><i style={{ fontSize: "0.9rem" }}>// Robert Baden-Powell</i>
                    </p>
                </div>
                <div className={'my-self'}>
                    <div className={'content'}>
                        <div className={'info'}>
                            <div className={'fade-effect'}>
                                <i style={{ fontSize: "0.9rem" }}><>//</> {t('about.major')}</i>
                                <br />
                                <div style={{ display: "flex", alignItems: "center" }}> <span className={'tag'}>&lt;h1&gt;</span>hi there, my name is <Label content={'Loc Nguyen'} />(Cjool)<span className={'tag'}>&lt;/h1&gt;</span></div>
                            </div>
                            <div className="code-object">
                                <span className={'tag'}>&lt;script&gt;</span>
                                <div className="object-brace">{"{"}</div>
                                <div className="object-row">
                                    <span className="object-key">description</span>
                                    <span className="object-colon">:</span>
                                    <span className="object-value">{t('about.profile')}</span>
                                </div>
                                <div className="object-brace">{"}"}</div>
                                <span className={'tag'}>&lt;/script&gt;</span>
                            </div>
                        </div>
                        <div className="profile">
                            <div>
                                <div className={'fade-effect'}>
                                    <i style={{ fontSize: "0.9rem" }}>// {t('about.bio')}</i>
                                    <div style={{ display: "flex", alignItems: "center" }}> <span className={'tag'}>&lt;h1&gt;</span><Label content={'BIO'} /><span className={'tag'}>&lt;/h1&gt;</span></div>
                                </div>
                            </div>
                            <div className="code-object">
                                <span className={'tag'}>&lt;script&gt;</span>
                                <div className="object-brace">{"{"}</div>

                                <div className="object-row">
                                    <span className="object-key">y2002</span>
                                    <span className="object-colon">:</span>
                                    <span className="object-value">{t("about.2002")}</span>
                                </div>

                                <div className="object-row">
                                    <span className="object-key">y2024_1</span>
                                    <span className="object-colon">:</span>
                                    <span className="object-value">{t("about.2024_1")}</span>
                                </div>

                                <div className="object-row">
                                    <span className="object-key">y2024_2</span>
                                    <span className="object-colon">:</span>
                                    <span className="object-value">{t("about.2024_2")}</span>
                                </div>

                                <div className="object-row">
                                    <span className="object-key">y2025</span>
                                    <span className="object-colon">:</span>
                                    <span className="object-value">{t("about.2025")}</span>
                                </div>

                                <div className="object-brace">{"}"}</div>
                                <span className={'tag'}>&lt;/script&gt;</span>
                            </div>
                        </div>
                        {/* <div className={'fade-effect'}>
                            <Label content={'I ♥'} />
                        </div> */}
                        {/* <div className={'fade-effect'}>
                            <Label content={t('about.title.contact')} />
                        </div>
                        <div className={'fade-effect'} style={{ display: 'flex' }}>
                            <p><a href={'mailto:locnguyen071102@gmail.com'}>Email</a></p>
                            <p><a href={'https://www.linkedin.com/in/loc-nguyen-171793311/'}> LinkedIn</a></p>
                            <p><a href={'https://www.facebook.com/nguyentanloc0711/'}> Facebook</a></p>
                        </div> */}
                    </div>
                </div>
            </div >
            <Skill />
            <Project />
            <div className="contact" id="contact" style={{ height: "100%" }}>
                <div>
                    <div className={'fade-effect'}>
                        <i style={{ fontSize: "0.9rem" }}>// {t('contact.description')}</i>
                        {/* <div style={{ display: "flex", alignItems: "center" }}> <span className={'tag'}>&lt;h1&gt;</span><Label content={t("contact.title")} /><span className={'tag'}>&lt;/h1&gt;</span></div> */}
                    </div>
                </div>
                <div className="terminal">

                    <div className="terminal-header">
                        <div className="terminal-buttons">
                            <span className="red" />
                            <span className="yellow" />
                            <span className="green" />
                        </div>

                        <div className="terminal-title">
                            {t("contact.title")} - bash
                        </div>
                    </div>

                    <div className="terminal-body">

                        <div className="line">
                            <span className="prompt">
                                loc@portfolio:~$
                            </span>

                            <span className="command">
                                whoami
                            </span>
                        </div>

                        <div className="output">
                            Loc Nguyen(cjool117)
                        </div>

                        <div className="line">
                            <span className="prompt">
                                loc@portfolio:~$
                            </span>

                            <span className="command">
                                contact
                            </span>
                        </div>

                        <div className="contact">

                            <div className="contact-row">
                                <MailOutlined />
                                <span>Email</span>

                                <a href="mailto:locnguyen071102@gmail.com">
                                    locnguyen071102@gmail.com
                                </a>
                            </div>

                            <div className="contact-row">
                                <LinkedinOutlined />
                                <span>LinkedIn</span>

                                <a
                                    href="https://www.linkedin.com/in/loc-nguyen-171793311/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    linkedin.com/in/loc-nguyen-171793311
                                </a>
                            </div>

                            <div className="contact-row">
                                <FacebookFilled />
                                <span>Facebook</span>

                                <a
                                    href="https://www.facebook.com/nguyentanloc0711/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    facebook.com/nguyentanloc0711
                                </a>
                            </div>

                        </div>

                        <div className="line">
                            <span className="prompt">
                                loc@portfolio:~$
                            </span>

                            <span className="cursor" />
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

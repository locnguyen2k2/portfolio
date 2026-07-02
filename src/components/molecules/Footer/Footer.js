import {
    GithubOutlined,
    LinkedinOutlined,
    BranchesOutlined,
    CheckCircleFilled,
    GlobalOutlined,
    MailOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";

import "./Footer.scss";

export default function Footer() {
    return (
        <footer className="status-bar">
            <div className="status-left">

                <div className="status-item">
                    <BranchesOutlined />
                    <span>main</span>
                </div>

                <div className="status-item">
                    <CheckCircleFilled />
                    <span>No Issues</span>
                </div>

                <div className="status-item">
                    <ThunderboltOutlined />
                    <span>React 19</span>
                </div>

            </div>

            <div className="status-right">

                <a
                    className="status-item"
                    href="https://github.com/locnguyen2k2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <GithubOutlined />
                </a>

                <a
                    className="status-item"
                    href="https://linkedin.com/in/loc-nguyen-171793311"
                    target="_blank"
                    rel="noreferrer"
                >
                    <LinkedinOutlined />
                </a>

                <a
                    className="status-item"
                    href="mailto:locnguyen071102@gmail.com"
                >
                    <MailOutlined />
                </a>

                <div className="status-item">
                    <GlobalOutlined />
                    <span>EN</span>
                </div>

                <div className="status-item copyright">
                    © 2026 Loc Nguyen
                </div>

            </div>
        </footer>
    );
}
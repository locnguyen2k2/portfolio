import {
    RightOutlined,
} from "@ant-design/icons";
import './BreadCrumb.scss';
import { useTranslation } from "react-i18next";
import { sidebarIcons } from "../Sidebar/Sidebar";

function findPath(nodes, target) {
    for (const node of nodes) {
        if (node.tab === target) {
            return [node];
        }

        if (node.children) {
            const result = findPath(node.children, target);

            if (result.length) {
                return [node, ...result];
            }
        }
    }
    return [];
}

export default function Breadcrumb({
    tabs,
    fileActiveOn,
    navigateTo,
}) {
    const { t } = useTranslation();
    const path = findPath(tabs, fileActiveOn);

    console.log('Breadcrumb path:', path.length > 1 ? path[0].root : null); // Debugging line to check the path
    return (
        <div className="breadcrumb">
            {path.map((item, index) => (
                <div
                    className="breadcrumb-item"
                    key={item.root ?? item.tab}
                >
                    <div
                        className="breadcrumb-link"
                        onClick={() =>
                            navigateTo(item.tab)
                        }
                    >
                        {item.prefix && sidebarIcons[item.prefix]}
                        {t(item.root ?? item.title)}
                    </div>

                    {index !== path.length - 1 && (
                        <RightOutlined className="separator" />
                    )}
                </div>
            ))}
        </div>
    );
}
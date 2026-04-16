import CardList from "../../organisms/Lists/CardList";

import './skill.scss';
import Label from "../../atoms/Lable/Label";
import Skeleton from "../../molecules/Skeleton/Skeleton";
import Tag from "../../atoms/Tag/Tag";
import { useTranslation } from "react-i18next";

// Programming Languages
const languages = [
    {
        body: <Tag color="#3178C6">
            <img src="https://img.shields.io/badge/TypeScript-FFF?logo=TypeScript&logoColor=3178C6" alt="TypeScript" />
            TypeScript
        </Tag>,
    }, {
        body: <Tag color="#F7DF1E">
            <img src="https://img.shields.io/badge/JavaScript-FFF?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" />
            JavaScript
        </Tag>,
    },
    {
        body: <Tag color="#339933">
            <img src="https://img.shields.io/badge/-Node.js-FFF?logo=node.js&logoColor=339933" alt="Node.js" />
            Node.js
        </Tag>,
    },
    {
        body: <Tag color="#FF6600">
            <img src="https://img.shields.io/badge/-RabbitMQ-FFF?logo=RabbitMQ&logoColor=FF6600" alt="RabbitMQ" />
            RabbitMQ
        </Tag>,
    },
    {
        body: <Tag color="#da2640">
            <img src="https://img.shields.io/badge/-Nestjs-FFF?logo=nestjs&logoColor=da2640" alt="NestJS" />
            NestJS
        </Tag>,
    }, {
        body: <Tag color="#0170FE">
            <img src="https://img.shields.io/badge/Go-FFF?logo=go&logoColor=0170FE" alt="Go" />
            Go
        </Tag>,
    },
    {
        body: <Tag color="#00ADD8">
            <img src="https://img.shields.io/badge/-Gin-FFF?logo=gin&logoColor=00ADD8" alt="Gin" />
            Gin
        </Tag>,
    },
    {
        body: <Tag color="#e10098">
            <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=graphql&logoColor=e10098" alt="GraphQL" />
            GraphQL
        </Tag>,
    }, {
        body: <Tag color="#5A29E4">
            <img src="https://img.shields.io/badge/-Axios-FFF?logo=Axios&logoColor=5A29E4" alt="Axios" />
            Axios
        </Tag>,
    },
    {
        body: <Tag color="#0170FE">
            <img src="https://img.shields.io/badge/-React-FFF?logo=react&logoColor=0170FE" alt="React" />
            React
        </Tag>,
    }, {
        body: <Tag color="#0170FE">
            <img src="https://img.shields.io/badge/-AntDesign-FFF?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" />
            Ant Design
        </Tag>,
    },
    {
        body: <Tag color="#E34F26">
            <img src="https://img.shields.io/badge/-HTML5-FFF?logo=HTML5&logoColor=E34F26" alt="HTML5" />
            HTML5
        </Tag>,
    }, {
        body: <Tag color="#1572B6">
            <img src="https://img.shields.io/badge/-CSS3-FFF?logo=CSS3&logoColor=1572B6" alt="CSS3" />
            CSS3
        </Tag>,
    }, {
        body: <Tag color="#CF649A">
            <img src="https://img.shields.io/badge/-Sass-FFF?logo=sass&logoColor=CF649A" alt="Sass" />
            Sass
        </Tag>,
    }, {
        body: <Tag color="#06B6D4">
            <img src="https://img.shields.io/badge/-TailwindCSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" />
            Tailwind CSS
        </Tag>,
    },
];

// Databases
const databases = [
    {
        body: <Tag color="#4479A1">
            <img src="https://img.shields.io/badge/-MySQL-FFF?logo=MySQL&logoColor=4479A1" alt="MySQL" />
            MySQL
        </Tag>,
    },
    {
        body: <Tag color="#336791">
            <img src="https://img.shields.io/badge/-PostgreSQL-FFF?logo=PostgreSQL&logoColor=336791" alt="PostgreSQL" />
            PostgreSQL
        </Tag>,
    }, {
        body: <Tag color="#47A248">
            <img src="https://img.shields.io/badge/-MongoDB-FFF?logo=MongoDB&logoColor=47A248" alt="MongoDB" />
            MongoDB
        </Tag>,
    }, {
        body: <Tag color="#4479A1">
            <img src="https://img.shields.io/badge/-ClickHouse-FFF?logo=ClickHouse&logoColor=4479A1" alt="ClickHouse" />
            ClickHouse
        </Tag>,
    },
];

// API & Communication
const apiCommunication = [

    {
        body: <Tag color="#85EA2D">
            <img src="https://img.shields.io/badge/-Swagger-FFF?logo=swagger&logoColor=85EA2D" alt="Swagger" />
            Swagger
        </Tag>,
    }, {
        body: <Tag color="#FF6C37">
            <img src="https://img.shields.io/badge/-Postman-FFF?logo=postman&logoColor=FF6C37" alt="Postman" />
            Postman
        </Tag>,
    },
];

// Monitoring & Observability
const monitoring = [
    {
        body: <Tag color="#F46800">
            <img src="https://img.shields.io/badge/-Grafana-FFF?logo=Grafana&logoColor=F46800" alt="Grafana" />
            Grafana
        </Tag>,
    }, {
        body: <Tag color="#E6522C">
            <img src="https://img.shields.io/badge/-Prometheus-FFF?logo=Prometheus&logoColor=E6522C" alt="Prometheus" />
            Prometheus
        </Tag>,
    }, {
        body: <Tag color="#000000">
            <img src="https://img.shields.io/badge/-OpenTelemetry-FFF?logo=OpenTelemetry&logoColor=000000" alt="OpenTelemetry" />
            OpenTelemetry
        </Tag>,
    },
];

// DevOps & Infrastructure
const devops = [
    {
        body: <Tag color="#181717">
            <img src="https://img.shields.io/badge/-GitHub-FFF?logo=github&logoColor=181717" alt="GitHub" />
            GitHub
        </Tag>,
    }, {
        body: <Tag color="#FC6D26">
            <img src="https://img.shields.io/badge/-GitLab-FFF?logo=gitlab&logoColor=FC6D26" alt="GitLab" />
            GitLab
        </Tag>,
    }, {
        body: <Tag color="#2496ED">
            <img src="https://img.shields.io/badge/-Docker-FFF?logo=Docker&logoColor=2496ED" alt="Docker" />
            Docker
        </Tag>,
    },
];

export default function Skill() {
    const { t } = useTranslation();
    return (<div className={'skills'}>
        <Label content={t('skills.title')} />
        <Skeleton />
        <div className={'skills-grid'}>
            <CardList effect={true} title={'Technologies'} data={languages} />
            <CardList effect={true} title={'Databases'} data={databases} />
            <CardList effect={true} title={'API & Communication'} data={apiCommunication} />
            <CardList effect={true} title={'Monitoring & Observability'} data={monitoring} />
            <CardList effect={true} title={'DevOps & Infrastructure'} data={devops} />
        </div>
    </div>)
}
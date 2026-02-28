import CardList from "../../organisms/Lists/CardList";

import './skill.scss';
import Label from "../../atoms/Lable/Label";
import Skeleton from "../../molecules/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";

// Programming Languages
const languages = [
    {
        body: <img
            src="https://img.shields.io/badge/TypeScript-FFF?logo=TypeScript&logoColor=3178C6&link=https%3A%2F%2Fwww.typescriptlang.org%2F"
            alt="TypeScript Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/JavaScript-FFF?logo=JavaScript&logoColor=F7DF1E&link=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript"
            alt="JavaScript Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Go-FFF?logo=go&logoColor=0170FE&link=https%3A%2F%2Fgo.dev"
            alt="Go Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Php-FFF?logo=php&logoColor=7A86B8&link=https%3A%2F%2Fwww.php.net"
            alt="PHP Badge" />,
    },
];

// Frontend Frameworks & Libraries
const frontendFrameworks = [
    {
        body: <img
            src="https://img.shields.io/badge/React-FFF?logo=react&logoColor=0170FE&link=https%3A%2F%2Freact.dev"
            alt="React Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Ant%20Design-FFF?logo=Ant-Design&logoColor=0170FE&link=https%3A%2F%2Fant.design%2F"
            alt="Ant Design Badge" />,
    },
];

// Backend Frameworks
const backendFrameworks = [
    {
        body: <img
            src="https://img.shields.io/badge/Nestjs-FFF?logo=nestjs&logoColor=da2640&link=https%3A%2F%2Fdocs.nestjs.com"
            alt="NestJS Badge" />,
    },
];

// Frontend Technologies
const frontendTech = [
    {
        body: <img
            src="https://img.shields.io/badge/HTML5-FFF?logo=HTML5&logoColor=E34F26&link=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2F"
            alt="HTML5 Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/CSS3-FFF?logo=CSS3&logoColor=1572B6&link=https%3A%2F%2Fwww.w3.org%2FStyle%2FCSS%2FOverview.en.html"
            alt="CSS3 Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Sass-FFF?logo=sass&link=https%3A%2F%2Fsass-lang.com"
            alt="Sass Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4&link=https%3A%2F%2Ftailwindcss.com%2F"
            alt="Tailwind CSS Badge" />,
    },
];

// Databases
const databases = [
    {
        body: <img
            src="https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&link=https%3A%2F%2Fwww.mysql.com%2F"
            alt="MySQL Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/PostgreSQL-4479A1?logo=PostgreSQL&logoColor=FFF&link=https%3A%2F%2Fwww.postgresql.org%2F"
            alt="PostgreSQL Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/MongoDB-00ed64?logo=MongoDB&logoColor=FFF&link=https%3A%2F%2Fwww.mongodb.com/docs%2F"
            alt="MongoDB Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/ClickHouse-4479A1?logo=ClickHouse&logoColor=FFF&link=https%3A%2F%2Fclickhouse.com%2F"
            alt="ClickHouse Badge" />,
    },
];

// Database Tools & ORMs
const databaseTools = [
    {
        body: <img
            src="https://img.shields.io/badge/Prisma-4479A1?logo=Prisma&logoColor=FFF&link=https%3A%2F%2Fwww.prisma.io%2F"
            alt="Prisma Badge" />,
    },
];

// API & Communication
const apiCommunication = [
    {
        body: <img
            src="https://img.shields.io/badge/GraphQL-FFF?logo=graphql&logoColor=e10098&link=https%3A%2F%2Fgraphql.org"
            alt="GraphQL Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF&link=https%3A%2F%2Fwww.rabbitmq.com%2F"
            alt="RabbitMQ Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Axios-FFF?logo=Axios&logoColor=5A29E4&link=https%3A%2F%2Fwww.axios.com%2F"
            alt="Axios Badge" />,
    },
];

// API Documentation & Testing
const apiTools = [
    {
        body: <img
            src="https://img.shields.io/badge/Swagger-FFF?logo=swagger&logoColor=38B832&link=https%3A%2F%2Fswagger.io"
            alt="Swagger Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Postman-FFF?logo=postman&logoColor=FF6C37&link=https%3A%2F%2Fwww.postman.com"
            alt="Postman Badge" />,
    },
];

// Monitoring & Observability
const monitoring = [
    {
        body: <img
            src="https://img.shields.io/badge/OpenTelemetry-FFF?logo=OpenTelemetry&logoColor=000000&link=https%3A%2F%2Fopentelemetry.io%2F"
            alt="OpenTelemetry Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Prometheus-FFF?logo=Prometheus&logoColor=fc6d26&link=https%3A%2F%2Fprometheus.io%2F"
            alt="Prometheus Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/Grafana-FFF?logo=Grafana&logoColor=fc6d26&link=https%3A%2F%2Fgrafana.com%2F"
            alt="Grafana Badge" />,
    },
];

// DevOps & Infrastructure
const devops = [
    {
        body: <img
            src="https://img.shields.io/badge/Docker-FFF?logo=Docker&logoColor=3178C6&link=https%3A%2F%2Fwww.docker.com%2F"
            alt="Docker Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/GitLab-FFF?logo=gitlab&logoColor=fc6d26&link=https%3A%2F%2Fdocs.gitlab.com"
            alt="GitLab Badge" />,
    }, {
        body: <img
            src="https://img.shields.io/badge/GitHub-FFF?logo=github&logoColor=000000&link=https%3A%2F%2Fgithub.com"
            alt="GitHub Badge" />,
    },
];

// Development Tools
const developmentTools = [
    {
        body: <img
            src='https://img.shields.io/badge/WebStorm-FFF?logo=webstorm&logoColor=307FFF&link=https%3A%2F%2Fwww.jetbrains.com/help/webstorm/getting-started-with-webstorm.html' alt='WebStorm Badge' />,
    }, {
        body: <img
            src='https://img.shields.io/badge/VS%20Code-FFF?logo=vscode&logoColor=fc6d26&link=https%3A%2F%2Fcode.visualstudio.com/docs' alt='VS Code Badge' />,
    },
];

export default function Skill() {
    const { t } = useTranslation();
    return (<div className={'skills'}>
        <Label content={t('skills.title')} />
        <Skeleton />
        <div className={'skills-grid'}>
            <CardList effect={true} title={'Programming Languages'} data={languages} />
            <CardList effect={true} title={'Frontend Frameworks'} data={frontendFrameworks} />
            <CardList effect={true} title={'Backend Frameworks'} data={backendFrameworks} />
            <CardList effect={true} title={'Frontend Technologies'} data={frontendTech} />
            <CardList effect={true} title={'Databases'} data={databases} />
            <CardList effect={true} title={'Database Tools'} data={databaseTools} />
            <CardList effect={true} title={'API & Communication'} data={apiCommunication} />
            <CardList effect={true} title={'API Tools'} data={apiTools} />
            <CardList effect={true} title={'Monitoring & Observability'} data={monitoring} />
            <CardList effect={true} title={'DevOps & Infrastructure'} data={devops} />
            <CardList effect={true} title={'Development Tools'} data={developmentTools} />
        </div>
    </div>)
}
import CardList from "../../organisms/List/CardList";

import './skill.scss';
import Label from "../../atoms/Lable/Label";
import Skeleton from "../../molecules/Skeleton/Skeleton";

const frontend = [{
    body: <img
        src="https://img.shields.io/badge/React-FFF?logo=react&logoColor=0170FE&link=https%3A%2F%2Freact.dev"
        alt="React Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Ant%20Design-FFF?logo=Ant-Design&logoColor=0170FE&link=https%3A%2F%2Fant.design%2F"
        alt="Ant Design Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/TypeScript-FFF?logo=TypeScript&logoColor=3178C6&link=https%3A%2F%2Fwww.typescriptlang.org%2F"
        alt="TypeScript Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/JavaScript-FFF?logo=JavaScript&logoColor=F7DF1E&link=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript"
        alt="JavaScript Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Graphql-FFF?logo=graphql&logoColor=e10098&link=https%3A%2F%2Fgraphql.org"
        alt="Graphql Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Swagger-FFF?logo=swagger&logoColor=38B832&link=https%3A%2F%2Fswagger.io"
        alt="Swagger Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Postman-FFF?logo=postman&logoColor=FF6C37&link=https%3A%2F%2Fwww.postman.com"
        alt="Postman Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Axios-FFF?logo=Axios&logoColor=5A29E4&link=https%3A%2F%2Fwww.axios.com%2F"
        alt="Axios Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/HTML5-FFF?logo=HTML5&logoColor=E34F26&link=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2F"
        alt="HTML5 Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Sass-FFF?logo=sass&link=https%3A%2F%2Fsass-lang.com"
        alt="Sass Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Tailwind CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4&link=https%3A%2F%2Ftailwindcss.com%2F"
        alt="Tailwind CSS Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/CSS3-FFF?logo=CSS3&logoColor=1572B6&link=https%3A%2F%2Fwww.w3.org%2FStyle%2FCSS%2FOverview.en.html"
        alt="CSS3 Badge"/>,
},];

const backend = [{
    body: <img
        src="https://img.shields.io/badge/Nestjs-FFF?logo=nestjs&logoColor=da2640&link=https%3A%2F%2Fdocs.nestjs.com"
        alt="Nestjs Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/TypeScript-FFF?logo=TypeScript&logoColor=3178C6&link=https%3A%2F%2Fwww.typescriptlang.org%2F"
        alt="TypeScript Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/JavaScript-FFF?logo=JavaScript&logoColor=F7DF1E&link=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript"
        alt="JavaScript Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Php-FFF?logo=php&logoColor=7A86B8&link=https%3A%2F%2Fwww.php.net"
        alt="Php Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Graphql-FFF?logo=graphql&logoColor=e10098&link=https%3A%2F%2Fgraphql.org"
        alt="Graphql Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Swagger-FFF?logo=swagger&logoColor=38B832&link=https%3A%2F%2Fswagger.io"
        alt="Swagger Badge"/>,
},];

const database = [{
    body: <img
        src="https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&link=https%3A%2F%2Fwww.mysql.com%2F"
        alt="MySQL Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/MongoDB-00ed64?logo=MongoDB&logoColor=FFF&link=https%3A%2F%2Fwww.mongodb.com/docs%2F"
        alt="MongoDB Badge"/>,
},];

const devops = [{
    body: <img
        src="https://img.shields.io/badge/Gitlab-FFF?logo=gitlab&logoColor=fc6d26&link=https%3A%2F%2Fdocs.gitlab.com"
        alt="Gitlab Badge"/>,
}, {
    body: <img
        src="https://img.shields.io/badge/Github-FFF?logo=github&logoColor=000000&link=https%3A%2F%2Fgithub.com"
        alt="Github Badge"/>,
}];
const tools = [{
    body: <img
        src='https://img.shields.io/badge/Webstorm-FFF?logo=webstorm&logoColor=307FFF&link=https%3A%2F%2Fwww.jetbrains.com/help/webstorm/getting-started-with-webstorm.html'/>,
}, {
    body: <img
        src='https://img.shields.io/badge/VsCode-FFF?logo=vscode&logoColor=fc6d26&link=https%3A%2F%2Fcode.visualstudio.com/docs'/>,
},]

export default function Skill() {
    return (<div className={'skills'}>
        <Label content={`My tech stacks`}/>
        <Skeleton/>
        <CardList effect={true} title={'Backend'} data={backend}/>
        <CardList effect={true} title={'Database'} data={database}/>
        <CardList effect={true} title={'Frontend'} data={frontend}/>
        <CardList effect={true} title={'Tools'} data={tools}/>
        <CardList effect={true} title={'DevOps'} data={devops}/>
    </div>)
}
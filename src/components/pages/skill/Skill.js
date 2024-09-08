import CardList from "../../organisms/List/CardList";

import './skill.scss';
import Label from "../../atoms/Lable/Label";

const frontend = [
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/React-FFF?logo=react&logoColor=0170FE&link=https%3A%2F%2Freact.dev'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Ant%20Design-FFF?logo=Ant-Design&logoColor=0170FE&link=https%3A%2F%2Fant.design%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/TypeScript-FFF?logo=TypeScript&logoColor=3178C6&link=https%3A%2F%2Fwww.typescriptlang.org%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/JavaScript-FFF?logo=JavaScript&logoColor=F7DF1E&link=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Graphql-FFF?logo=graphql&logoColor=e10098&link=https%3A%2F%2Fgraphql.org'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Swagger-FFF?logo=swagger&logoColor=38B832&link=https%3A%2F%2Fswagger.io'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Postman-FFF?logo=postman&logoColor=FF6C37&link=https%3A%2F%2Fwww.postman.com'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Axios-FFF?logo=Axios&logoColor=5A29E4&link=https%3A%2F%2Fwww.axios.com%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/HTML5-FFF?logo=HTML5&logoColor=E34F26&link=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Sass-FFF?logo=sass&link=https%3A%2F%2Fsass-lang.com'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Tailwind CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4&link=https%3A%2F%2Ftailwindcss.com%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/CSS3-FFF?logo=CSS3&logoColor=1572B6&link=https%3A%2F%2Fwww.w3.org%2FStyle%2FCSS%2FOverview.en.html'}></object>
        </>,
    },
]
const backend = [
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Nestjs-FFF?logo=nestjs&logoColor=da2640&link=https%3A%2F%2Fdocs.nestjs.com'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Php-FFF?logo=php&logoColor=7A86B8&link=https%3A%2F%2Fwww.php.net'}></object>
        </>,
    },
]
const database = [
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&link=https%3A%2F%2Fwww.mysql.com%2F'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/MongoDB-00ed64?logo=MongoDB&logoColor=FFF&link=https%3A%2F%2Fwww.mongodb.com/docs%2F'}></object>
        </>,
    },
]
const apis = []
const devops = [
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Gitlab-FFF?logo=gitlab&logoColor=fc6d26&link=https%3A%2F%2Fdocs.gitlab.com'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Github-FFF?logo=github&logoColor=000000&link=https%3A%2F%2Fgithub.com'}></object>
        </>,
    },
]
const tools = [
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/Webstorm-FFF?logo=webstorm&logoColor=307FFF&link=https%3A%2F%2Fwww.jetbrains.com/help/webstorm/getting-started-with-webstorm.html'}></object>
        </>,
    },
    {
        body: <>
            <object
                data={'https://img.shields.io/badge/VsCode-FFF?logo=vscode&logoColor=fc6d26&link=https%3A%2F%2Fcode.visualstudio.com/docs'}></object>
        </>,
    },
]
export default function Skill() {
    return (
        <div className={'skills'}>
            <Label content={'Skill stack'}/>
            <CardList title={'Backend'} data={backend}/>
            <CardList title={'Database'} data={database}/>
            <CardList title={'Frontend'} data={frontend}/>
            <CardList title={'Tools'} data={tools}/>
            <CardList title={'DevOps'} data={devops}/>
        </div>
    )
}